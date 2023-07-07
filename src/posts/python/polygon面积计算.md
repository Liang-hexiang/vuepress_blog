---
icon: fish
date: 2023-07-01
cover: https://img.tucang.cc/api/image/show/72e720a5032441381e8d626f0e6538f1
category:
    - python
tag:
  - polygon
  - mysql
  - python
---


# Python操作Polygon


### 1. Polygon面积计算

> 首先介绍什么是Polygon，在地理信息系统(GIS)中，polygon是经纬度构成的多边形，可以用来描绘地理边界，区域和建筑物轮廓灯。在mysql中，可以使用polygon数据类型存储，Python的`Shapely`库提供了操作polygon数据的工具。

在编程语言中，polygon数据多存储在二维列表中，例如`[[1, 2],[2, 0], [0, 1],......]`,  在数学中计算不规则多边形面积之一的公式是鞋带公式(也成高斯面积公式)

对于任意一个多边形，如果已知其各个顶点的坐标，

那么这个多边形的面积为：



其中y(i+1)=y1, x(i+1)=x1

https://blog.csdn.net/xza13155/article/details/112118676

把上述公式转换成Python计算polygon边界面积的代码：

```python
def polygon_area(polygon):
    """
    :param polygon: 多边形坐标 list
    :return: 多边形面积 float
    """
    length = len(polygon)
    area = 0.0
    for i in range(length):
        x1, y1 = polygon[i]
        # 如果xn为最后一项，则为xn*y1-yn*x1
        x2, y2 = polygon[(i+1) % length]
        area += (x1*y2 - y1*x2)
    area = abs(area) * 0.5
    return area
```

如果使用第三方库shapely：

```python
from shapely.geometry import Polygon
def gis_polygon_area(coordinates):
    polygon = Polygon(coordinates)
    area = polygon.area
    return area
```

