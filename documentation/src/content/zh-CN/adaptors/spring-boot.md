# Spring Boot 集成指南

SXO 为使用 Spring Boot 配合 Thymeleaf、FreeMarker 或 JSP 的项目提供了极简的集成方案。通过 AOT 预编译模式，您可以像引入 Bootstrap 一样轻松升级您的企业级应用 UI。

## 📦 集成方式

### 1. Spring Boot + Thymeleaf

在 Thymeleaf 模板的公共头部 (`head.html` 或 `layout.html`) 中引入资源：

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org" data-sxo-theme="github">
<head>
    <meta charset="UTF-8">
    <title>SXO Spring Boot Integration</title>
    <!-- 推荐将资源放在 static 目录下或使用 WebJars，也可直接使用 CDN -->
    <link rel="stylesheet" th:href="@{https://cdn.sxoui.com/sxo-core.css}">
    <link rel="stylesheet" th:href="@{https://cdn.sxoui.com/sxo-theme-github.css}">
</head>
<body>
    <div class="container">
        <h1 class="sxo-title">系统管理</h1>
        <button class="sxo-btn sxo-btn-primary">保存设置</button>
    </div>

    <!-- 引入运行时 JS -->
    <script th:src="@{https://cdn.sxoui.com/sxo.js}"></script>
</body>
</html>
```

### 2. 传统 JSP / Servlet

在 JSP 页面中引入：

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/sxo-core.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/sxo-theme-github.css">
</head>
<body>
    <button class="sxo-btn sxo-btn-primary">JSP 按钮</button>
    
    <script src="${pageContext.request.contextPath}/js/sxo.js"></script>
</body>
</html>
```

## 🛠️ 后端动态主题控制

您可以根据用户的后台设置，动态渲染 HTML 的 `data-sxo-theme` 属性：

```html
<!-- Thymeleaf 示例 -->
<html th:data-sxo-theme="${userConfig.themeName}">
```

## 📥 离线部署 (推荐)

对于内网环境或企业级项目，建议将资源下载并存放在项目的静态资源目录：

- `src/main/resources/static/css/sxo-core.css`
- `src/main/resources/static/css/sxo-theme-github.css`
- `src/main/resources/static/js/sxo.js`

然后在 Maven `pom.xml` 中确保这些文件不会被资源过滤破坏：

```xml
<build>
    <resources>
        <resource>
            <directory>src/main/resources</directory>
            <filtering>true</filtering>
            <excludes>
                <exclude>static/fonts/**</exclude>
            </excludes>
        </resource>
    </resources>
</build>
```

## 🚀 为什么选择 SXO 而非 Bootstrap？

1.  **现代化审美**: 原生支持 CSS 变量和 Grid 布局。
2.  **无 jQuery 依赖**: 现代 Java 项目不再需要为了 UI 引入沉重的旧版 JS 库。
3.  **极小体积**: AOT 编译后的产物通常只有 Bootstrap 的 1/5 大小。
