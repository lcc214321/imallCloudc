<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
  <title></title>
</head>
<body>
sso登录失败了，如错误的ticket。<br/>
<c:if test="${not empty param.error}">
  错误码：
  ${param.error}
  ${param.error_description}
</c:if>
</body>
</html>