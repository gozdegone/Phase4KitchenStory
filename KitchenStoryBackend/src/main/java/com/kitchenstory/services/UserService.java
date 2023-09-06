package com.kitchenstory.services;

import com.kitchenstory.model.entity.User;
import com.kitchenstory.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public void saveUser(User user) {
        this.userRepository.save(user);
    }

    public User findAdmin(String username) {
        return this.userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("No user found!"));
    }

}
