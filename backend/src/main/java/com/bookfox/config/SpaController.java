
package com.bookfox.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
public class SpaController {
   @RequestMapping(value = {"/", "/{path:[^\\.]*}", "/{path:^(?!api|fonts|icons|static|images|css|js).*$}/**/{path:[^\\.]*}"})
   public String forward() {
      return "forward:/index.html"; // src/main/resources/static/index.html로 포워딩
   }
}

