//比起聚合管道，自定义的js可以提供更大的灵活性，一般来说，map-reduce会比聚合管道略低效并且更复杂。
//While the custom JavaScript provide great flexibility compared to the aggregation pipeline, in general, map-reduce is less efficient and more complex than the aggregation pipeline.

/* Pipeline Operators and Indexes */
//$match和$sort操作符出现在管道开始时，可以使用到索引
//The $match and $sort pipeline operators can take advantage of an index when they occur at the beginning of the pipeline.

/**
如果group操作针对的不是已经存在的文档字段，而是运算得出的，则用$keyf关键字代替key
Use $keyf instead of key to group by calculated fields rather than existing document fields.
{
  group:
   {
     ns: <namespace>,
     key: <key>,
     $reduce: <reduce function>,
     $keyf: <key function>,
     cond: <query>,
     finalize: <finalize function>
   }
}
//在mongo shell中，有一个包装方法db.collection.group()，接受的参数是keyf和reduce，而在执行group命令的时候，用的是$keyf和$reduce字段。（真是受不了……）
For the shell, MongoDB provides a wrapper method db.collection.group(). However, the db.collection.group() method takes the keyf field and the reduce field whereas the group command takes the $keyf field and the $reduce field.
*/

/** 操作符列表：
* $project 重塑每个文档，按需求增删字段。每一个输入文档，产生一个输出文档
* $match 使用标准的mongoDB查询
* $let 可以构建临时变量，只在$let中有效
* $map 输入和输出都是一个数组
* $redact Restricts the contents of the documents based on information stored in the documents themselves.（水太深，搞不太明白）
  基于文档自身存储的信息来限制文档内容 $$DESCEND $$PRUNE $$KEEP
* $limit 确定最大的文档传递个数。
* $unwind 解构数组字段，并输出文档，包含所有字段，并会用数组的一个元素来代替之前的数组，所以一个输入文档，可能会产生多个输出文档
* $group 注意与group命令和collection的group快捷操作区分开
* $sort 在管道开始处时，可以用到索引
* $out 指定输出的collection，必须是最后一个stage。无法写入到sharded collection和固定集合capped collection。会替换已有的collection
*/

/** $group
_id为必须字段，但是可以将_id设为null来计算所有输入文档的累加值
The _id field is mandatory; however, you can specify an _id value of null to calculate accumulated values for all the input documents as a whole.
$sum 会忽略非数字值
$avg 会忽略非数字值
$first Only meaningful when documents are in a defined order. 只在排序时有意义
$last Only meaningful when documents are in a defined order. 只在排序时有意义

$group stage有100M的内存限制。默认情况下，超过限制，将会引发错误。但可以通过设置allowDiskUse选项为true来使$group操作可写临时文件，以此来允许操作处理大数据集
The $group stage has a limit of 100 megabytes of RAM. By default, if the stage exceeds this limit, $group will produce an error. However, to allow for the handling of large datasets, set the allowDiskUse option to true to enable $group operations to write to temporary files.
*/

/*** Expression Operators表达式操作符 ***/
/**
 * 一般都通过数组提供参数，当接受单个参数时，可以省略外围的数组圈引
 */

/*** Boolean Operators布尔操作符 ***/
/**
 * 除了false之外，Boolean表达式会把null, 0, undefined也当false处理。注意：空字符串会当true。
 */

/*** Set Operators集合操作符 ***/
/**
 * $setEquals 集合相等
 * $setIntersection 交集
 * $setUnion 并集
 * $setDifference 差集
 * $setIsSubset A为B的子集
 * $anyElementTrue 有任何一个元素为true
 * $allElementsTrue 所有的元素为true
 */

/*** Comparison Operators比较操作符 ***/
/**
 * $cmp
 * $eq
 * $gt
 * $gte
 * $lt
 * $lte
 * $ne
 */

/*** Arithmetic Operators比较操作符 ***/
/**
 * $add 为日期加上一个时间戳，可接受任意多个参数，但最多只能由一个参数可以被解析为日期对象
 * $subtract 数字减数字得数字，日期减数字得日期，日期减日期得毫秒数
 * $multiply
 * $divide 执行浮点数除法
 * $mod
 */

/*** String Operators字符串操作符 ***/
/**
 * $concat 如果一个参数解析为null或者指向不存在的字段，则返回null
 * $substr 只对ASCII码的操作行为得到了良好规范
 * $toLower null会返回空字符串
 * $toUpper null会返回空字符串
 * $strcasecmp 忽略大小写
 */

/*** Array Operators数组操作符 ***/
/**
 * $size 如果一个参数解析为null或者指向不存在的字段，则返回null
 */

/*** Variable Operators变量操作符 ***/
/**
 * $map 循环处理数组元素，并返回新的数组
 * $let 重新设置变量，只在内部in子表达式中有效
 */

/*** Conditional Expressions条件表达式 ***/
/**
 * $cond 三元运算
 * $ifNull 默认赋值
 */

/*** Date Operators条件表达式 ***/
/**
 * $dayOfYear 1-366
 * $dayOfMonth 1-31
 * $dayOfWeek 1(Sunday)-7(Saturday)
 * $year
 * $month 1-12
 * $week between 0 (the partial week that precedes the first Sunday of the year) and 53 (leap year)
 * $hour 0-23
 * $minute 0-59
 * $second 0-60(闰秒)
 * $millisecond 0-999
 * $dateToString 格式化输出
 */
