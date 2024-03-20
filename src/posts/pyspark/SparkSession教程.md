---
date: 2024-02-01
icon: 'map'
author: '梁贺祥'
cover: 'https://img.tucang.cc/api/image/show/da3546c26f3726a1f7a63e96921b30ff'
category:
    - 技术
    - IT
tag:
    - 大数据
    - SparkSession
    - PySpark
sticky: 6
---
:bookmark: 自 Spark 2.0 起，SparkSession 已成为 PySpark 与 RDD 和 DataFrame 配合使用的入口点。在2.0之前，入口点曾是SparkContext。 本节内容将主要通过定义和描述如何创建 SparkSession 以及使用-shellspark中的默认 SparkSession 变量来重点解释什么是 SparkSession........
<!-- more -->
# :book:理解SparkSession



## :one:SparkSession
:pencil2:在Spark2.0版本，pyspark.sql引入了一个新类`SparkSession`。SparkSession 是我们在 2.0 版本之前使用的所有不同上下文（SQLContext 和 HiveContext 等）的组合类。从 2.0 开始，SparkSession 可以用来替换 SQLContext、HiveContext 以及 2.0 之前定义的其他上下文。
:pencil2:正如开头提到的，SparkSession 是 PySpark 的入口点，创建 SparkSession 实例将是您使用 RDD、DataFrame 和 Dataset 进行编程时编写的第一个语句。
:pencil2:虽然 SparkContext 在 2.0 之前曾经是一个入口点，但并没有完全被 SparkSession 取代。SparkContext 的许多功能在 Spark 2.0 及更高版本中仍然可用，而且SparkSession是在内部创建了`SparkConfig `和`SparkContext`，并通过`SparkSession`来提供配置创建。

SparkSession还包括其他不同上下文的API：
* SparkContext,
* SQLContext,
* StreamingContext,
* HiveContext.

:question: PySpark程序中可以创建多少个SparkSession？
    
    可以创建多个SparkSession。如果想要PySpark表在逻辑上分离时，就需要使用`SparkSession.builder()`或者`SparkSession.newSession()`创建多个SparkSession
## :two:创建SparkSession
在PySpark程序中，需要使用构造器方法builder方法。builder方法的使用方法如下：
```python
# Create SparkSession from builder
import pyspark
from pyspark.sql import SparkSession
spark = SparkSession.builder.master("local[1]") \
                    .appName('SparkByExamples.com') \
                    .getOrCreate()
```
- `master()`: 如果是在集群上运行程序，需要使用主机名称为参数传入master()。这个参数值通常是`yarn`或者是`mesos`，这取决于你的主节点的配置。
- `local[num]`: 在单机模式下运行的时候使用。`num`应该是一个整数值，表示的是在使用`RDD`、`DataFrame`、`DataSet`时应该创建多少个分区。一般这个值可以是CPU核心数。
- `appName()`: 设置应用名称
- `getOrCreate()`: 从名字即可看出，获取或者创建SparkSession，如果已经存在则获取，否则创建新的SparkSession


**创建另一个SparkSession：**
```python
# Create new SparkSession
spark2 = SparkSession.newSession
print(spark2)
```
> 使用上面的代码会创建一个新的SparkSession，并且与现有的SparkSession使用相同的应用名称。两个会话的底层 SparkContext 是相同的，因为每个 PySpark 应用程序只能有一个上下文。

**获取现有的SparkSession**
```python
# Get Existing SparkSession
spark3 = SparkSession.builder.getOrCreate
print(spark3)
```

## :three:使用 Spark 配置
可以使用`config`方法为SparkSession增加配置
```python
# 使用 config()
spark = SparkSession.builder 
      .master("local[1]") 
      .appName("SparkByExamples.com") 
      .config("spark.some.config.option", "config-value") 
      .getOrCreate()
```
## :four: 创建启用Hive的SparkSession
> 为了将 Hive 与 PySpark 一起使用，您需要使用该enableHiveSupport()方法启用它。
```python
spark = SparkSession.builder \
      .master("local[1]") \
      .appName("SparkByExamples.com") \
      .config("spark.sql.warehouse.dir", "<path>/spark-warehouse") \
      .enableHiveSupport() \
      .getOrCreate()
```

## :five: 获取或配置PySpark Config
> 创建 SparkSession 后，您可以在运行时添加 Spark 配置或获取所有配置。

```python
# Set Config
spark.conf.set("spark.executor.memory", "5g")

# Get a Spark Config
partitions = spark.conf.get("spark.sql.shuffle.partitions")
print(partitions)
```

## :six: 简单创建DataFrame
使用`createDataFrame`创建DataFrame
```python
# Create DataFrame
df = spark.createDataFrame(
    [("Scala", 25000), ("Spark", 35000), ("PHP", 21000)])
df.show()

# Output
#+-----+-----+
#|   _1|   _2|
#+-----+-----+
#|Scala|25000|
#|Spark|35000|
#|  PHP|21000|
#+-----+-----+
```

:link: <a href='https://sparkbyexamples.com/pyspark/different-ways-to-create-dataframe-in-pyspark/'>其他创建DataFrame的方法</a>


、