# Mysql知识积累


### 1. Mysql内置函数

#### 1. instr
简介：
> 函数返回字符串中子字符串第一次出现的位置.如果在str中找不到子字符串，则INSTR()函数返回零(0)

使用场景：
> 想要在字符串中查找子字符串或检查字符串中是否存在子字符串。

函数语法:

```sql
INSTR(str,substr);
```

`INSTR`函数接受两个参数：**str**是要搜索的字符串,**substr**是要搜索的子字符串。

#### 2. substr

简介：

> substr从字符串中提取特定长度的子字符串

使用场景：

> 想要通过索引截取字符串的一部分。

函数语法：

```sql
substr(string string,num start,num length);
```

string为字符串；start为起始位置；length为长度。

:warning:start是从1开始的


### 2. 查询

#### 1. 1子查询

子查询指一个查询语句嵌套在另一个查询语句内部的查询，这个特性从MySQL 4.1开始引入

##### 子查询操作符

1. ANY（SOME）

   >  ANY和SOME关键字是同义词，表示满足其中任一条件，它们允许创建一个表达式对子查询的返回值列表进行比较，只要满足内层子查询中的任何一个比较条件，就返回一个结果作为外层查询的条件

   ![img](https://cdn.nlark.com/yuque/0/2023/png/21881466/1680257852246-b1c2996b-aa6e-4079-a290-d35c23b2515c.png)

2. ALL

   >  ALL关键字与ANY和SOME不同，使用ALL时需要同时满足所有内层查询的条件。

   ![img](https://cdn.nlark.com/yuque/0/2023/png/21881466/1680257896133-1033c011-39b3-4270-8244-2afdd83a4d38.png)

3. IN

   >  IN关键字进行子查询时，内层查询语句仅仅返回一个数据列，这个数据列里的值将提供给外层查询语句进行比较操作。

   ![img](https://cdn.nlark.com/yuque/0/2023/png/21881466/1680258121818-4baff6c0-ea14-4415-9f9f-7e5a590379f5.png)

4. EXISTS

   >  EXISTS关键字后面的参数是一个任意的子查询，系统对子查询进行运算以判断它是否返回行，如果至少返回一行，那么EXISTS的结果为true，此时外层查询语句将进行查询；如果子查询没有返回任何行，那么EXISTS返回的结果是false，此时外层语句将不进行查询。

#### 2.2 `REGEXP`的用法

REGEXP 是用于进行正则表达式匹配的运算符。

**`like`**关键字可以进行模糊匹配，Mysql同样也支持正则表达式的匹配，Mysql中使用**`REGEXP`**和**`RLIKE`**操作符来进行正则表达式匹配。

可用于**`REGEXP`**的正则模式:

| 模式       | 描述                                                         |
| :--------- | :----------------------------------------------------------- |
| ^          | 匹配输入字符串的开始位置。如果设置了 RegExp 对象的 Multiline 属性，^ 也匹配 '\n' 或 '\r' 之后的位置。 |
| $          | 匹配输入字符串的结束位置。如果设置了RegExp 对象的 Multiline 属性，$ 也匹配 '\n' 或 '\r' 之前的位置。 |
| .          | 匹配除 "\n" 之外的任何单个字符。要匹配包括 '\n' 在内的任何字符，请使用像 '[.\n]' 的模式。 |
| [...]      | 字符集合。匹配所包含的任意一个字符。例如， '[abc]' 可以匹配 "plain" 中的 'a'。 |
| [^...]     | 负值字符集合。匹配未包含的任意字符。例如， '[^abc]' 可以匹配 "plain" 中的'p'。 |
| p1\|p2\|p3 | 匹配 p1 或 p2 或 p3。例如，'z\|food' 能匹配 "z" 或 "food"。'(z\|f)ood' 则匹配 "zood" 或 "food"。 |
| *          | 匹配前面的子表达式零次或多次。例如，zo* 能匹配 "z" 以及 "zoo"。* 等价于{0,}。 |
| +          | 匹配前面的子表达式一次或多次。例如，'zo+' 能匹配 "zo" 以及 "zoo"，但不能匹配 "z"。+ 等价于 {1,}。 |
| {n}        | n 是一个非负整数。匹配确定的 n 次。例如，'o{2}' 不能匹配 "Bob" 中的 'o'，但是能匹配 "food" 中的两个 o。 |
| {n,m}      | m 和 n 均为非负整数，其中n <= m。最少匹配 n 次且最多匹配 m 次。 |

:tipping_hand_man: 复习一下正则表达式的字符类吧：

- `.`：匹配任意单个字符。
- `^`：匹配字符串的开始。
- `$`：匹配字符串的结束。
- `*`：匹配零个或多个前面的元素。
- `+`：匹配一个或多个前面的元素。
- `?`：匹配零个或一个前面的元素。
- `[abc]`：匹配字符集中的任意一个字符。
- `[^abc]`：匹配除了字符集中的任意一个字符以外的字符。
- `[a-z]`：匹配范围内的任意一个小写字母。
- `\d`：匹配一个数字字符。
- `\w`：匹配一个字母数字字符（包括下划线）。
- `\s`：匹配一个空白字符。

下面我们从几个案例来学习一下**`REGEXP`**的基本使用：

```sql
SELECT column1, column2, ...
FROM table_name
WHERE column_name REGEXP 'pattern';
```

**参数说明：**

- `column1`, `column2`, ... 是你要选择的列的名称，如果使用 `*` 表示选择所有列。
- `table_name` 是你要从中查询数据的表的名称。
- `column_name` 是你要进行正则表达式匹配的列的名称。
- `'pattern'` 是一个正则表达式模式。



1. **查找 name 字段中以 'st' 为开头的所有数据：**

```sql
mysql> SELECT name FROM person_tbl WHERE name REGEXP '^st';
```

2. **查找 name 字段中以 **'ok'** 为结尾的所有数据：**

   ```sql
   mysql> SELECT name FROM person_tbl WHERE name REGEXP 'ok$';
   ```

3. **查找 name 字段中包含 **'mar'** 字符串的所有数据：**

   ```sql
   mysql> SELECT name FROM person_tbl WHERE name REGEXP 'mar';
   ```

4. 查找 name 字段中以元音字符开头或以 **'ok'** 字符串结尾的所有数据：

   ```sql
   mysql> SELECT name FROM person_tbl WHERE name REGEXP '^[aeiou]|ok$';
   ```

5. 选择订单表中描述中包含 "item" 后跟一个或多个数字的记录。

   ```sql
   SELECT * FROM orders WHERE order_description REGEXP 'item[0-9]+';
   ```

6. 使用 **BINARY** 关键字，使得匹配区分大小写：

   ```sql
   SELECT * FROM products WHERE product_name REGEXP BINARY 'apple';
   ```

7. 使用 OR 进行多个匹配条件，以下将选择姓氏为 "Smith" 或 "Johnson" 的员工记录：

   ```sql
   SELECT * FROM employees WHERE last_name REGEXP 'Smith|Johnson';
   ```

**:book:** **RLIKE 是 MySQL 中用于进行正则表达式匹配的运算符，与 REGEXP 是一样的，RLIKE 和 REGEXP 可以互换使用，没有区别。**

### 3. 插入

#### 2.1 ingore

插入数据时，如果数据已经存在，则不再执行插入

### 4. 修改

### 5. 删除

### 6. 存储过程和函数

#### 1. 存储过程





### 7. 地理类型

##### 1. 使用`ST_Distance_Sphere`函数计算经纬度距离



