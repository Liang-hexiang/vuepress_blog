---
icon: pen
date: 2023-12-06
cover: https://img.tucang.cc/api/image/show/5383cab4c54b110f368ce995153f0de3
category:
    - python
tag:
    - Linux
    - python
---


# 设计模式

## 单例模式

### 1. 普通单例模式
> _ _new_ _方法可以在实例化类的时候通过hasattr方法返回同一个实例


```python
class ExerciseSinglePattern:
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '_instance'):
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self, a, b):
        print('__init__')
        self.a = a
        self.b = b
if __name__ == '__main__':
    sp = ExerciseSinglePattern('a', 'b')
    sp2 = ExerciseSinglePattern('c', 'd')
    print(sp)
    print(sp2)
    # <__main__.ExerciseSinglePattern object at 0x00000243AF6E4F70>
	# <__main__.ExerciseSinglePattern object at 0x00000243AF6E4F70>
```

### 2. 使用装饰器实现单例模式

#### 2.1 装饰器（Decorators）

> 装饰器是Python中很重要的内容，属于Python的进阶知识；装饰器的本质可以理解为一个高阶函数，因为它返回的是一个函数对象。

:one:类装饰器