package com.springboot.bookstore.repository;


import com.springboot.bookstore.entity.OrderDetails;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long> {
    @Query("SELECT p.id, p.image, p.title, p.oldPrice, p.currentPrice, SUM(od.quantity) as totalQuantity " +
            "FROM OrderDetails od " +
            "JOIN od.product p " +
            "GROUP BY od.product.id " +
            "ORDER BY totalQuantity DESC")
    Page<Object[]> findBestSellingProducts(Pageable pageable);

    Optional<OrderDetails> findById (int id);
}
