package cn.stylefeng.guns.compent;

import cn.stylefeng.guns.base.auth.model.LoginUser;
import cn.stylefeng.guns.base.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.cas.authentication.CasAssertionAuthenticationToken;
import org.springframework.security.core.userdetails.AuthenticationUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomCasUserDetailsService implements AuthenticationUserDetailsService<CasAssertionAuthenticationToken> {


    @Autowired
    private AuthService authService;


    @Override
    public UserDetails loadUserDetails(CasAssertionAuthenticationToken token) throws UsernameNotFoundException {

        System.out.println("当前认证成功的用户名:" + token.getName());

        //加载用户权限信息，注意这里已经由cas完成认证，不再需要加载密码了
        String name = token.getName();
        System.out.println("name:" + name);
        //登录并创建token
        String token1 = authService.login(name);
        System.out.println("token1:" + token1);
        LoginUser user2 = authService.user(name);
        System.out.println("user2:" + user2);
        return user2;
//		com.hou.cassecurity.pojo.User user = userMapper.findByUsername();
//		List<Role> roles = user.getRoles();
//		//准备权限集合
//		List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
//
//		for (Role role : roles) {
//			grantedAuthorities.add(new SimpleGrantedAuthority(role.getRolename()));
//		}
//		//注意这里user中的密码可以不写，因为cas已经验证过了，现在只是需要把该用户的权限注入security中，但是也不能是null，null就会报错
//		User user1 = new User(token.getName(), "", grantedAuthorities);
//		return user1;

    }


}
