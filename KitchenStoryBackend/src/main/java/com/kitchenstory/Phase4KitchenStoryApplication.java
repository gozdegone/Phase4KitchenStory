package com.kitchenstory;

import com.kitchenstory.model.entity.User;
import com.kitchenstory.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
@RequiredArgsConstructor
public class Phase4KitchenStoryApplication implements CommandLineRunner {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(Phase4KitchenStoryApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        this.userRepository.save(new User("admin@kitchenstory.com", "admin", this.passwordEncoder.encode("admin123"), "ROLE_ADMIN"));
    }


}
