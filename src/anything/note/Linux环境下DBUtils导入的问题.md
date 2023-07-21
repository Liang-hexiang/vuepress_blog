# DBUtils版本问题
### 前言
![image](https://img2023.cnblogs.com/blog/2432585/202307/2432585-20230719090938564-1692406477.png)

事情的起因是，原本在pycharm上开发的代码，因为要使用到线程池，所以就按安装了DBUtils，在windows上运行代码倒没什么问题，后因代码运行时需要占用的内存过多，所以代码要转移到Linux服务器上，问题由之而来，运行代码时总会会报出找不到DBUtils库的错误，经过几番反复确认，python环境已经安装了DBUtils，而且安装的其他三方库皆无问题，所以便是用了万能的百度，终于是解决了问题


### 如何解决
更改导入模块的写法即可
```python
from dbutils.pooled_db import PooledDB
```
网上有教程说是版本 <=1.3的DBUtils.PooledDB的方式导入是没问题的，但是我把版本降低到1.3还是出错，最终还是选择了>=2.0的版本，使用`from dbutils.pooled_db import PooledDB`的方式导入，最终完美解决问题。