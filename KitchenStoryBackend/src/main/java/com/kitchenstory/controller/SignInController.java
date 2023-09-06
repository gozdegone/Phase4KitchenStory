package com.kitchenstory.controller;


import com.kitchenstory.jwthelper.JwtUtil;
import com.kitchenstory.model.entity.User;
import com.kitchenstory.model.request.JwtRequest;
import com.kitchenstory.model.response.JwtResponse;
import com.kitchenstory.services.CustomUserDetailService;
import com.kitchenstory.services.UserService;
import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Slf4j
public class SignInController {


    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailService customUserDetailService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> generateToken(@RequestBody JwtRequest jwtRequest) {
        try {
            this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword()));
        } catch (UsernameNotFoundException e) {
            log.error("Authentication failed", e);
        }

        UserDetails userDetails = this.customUserDetailService.loadUserByUsername(jwtRequest.getUsername());
        String token = this.jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }

    @PutMapping("/change-password")
    public ResponseEntity<User> setPassword(@RequestBody User admin) {
        User user = this.userService.findAdmin(admin.getUsername());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            user.setPassword(this.passwordEncoder.encode(admin.getPassword()));
            this.userService.saveUser(user);
            return ResponseEntity.ok(user);
        }
    }

}
