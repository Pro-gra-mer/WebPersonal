package com.rebecaperez.portfolio.repository;

import com.rebecaperez.portfolio.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
