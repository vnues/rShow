# 如何使用

```javascript
<div>
    <div r-show={true}>🎉🎉r-show</div>
</div>;


```


# 效果

```javascript
React.createElement("div", null, true ? React.createElement("div", null, "🎉🎉r-show") : null);
```

# ❗️❗️注意

此处r-show的做法是采用三目表达式处理并不是采用`display:none`