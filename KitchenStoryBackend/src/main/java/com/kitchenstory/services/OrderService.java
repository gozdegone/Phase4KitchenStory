package com.kitchenstory.services;

import com.kitchenstory.model.entity.Order;
import com.kitchenstory.repository.OrderRepository;
import java.text.DateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public void saveOrder(Order order) {
        DateFormat df = DateFormat.getDateInstance();
        Calendar cl = Calendar.getInstance();
        String od = df.format(cl.getTime());
        order.setOd(od);

        this.orderRepository.save(order);
    }

    public List<Order> getOrders() throws NotFoundException {
        List<Order> orders = this.orderRepository.findAll();
        if (CollectionUtils.isEmpty(orders)) {
            throw new NotFoundException();
        }
        return orders;
    }

    public void deleteOrder(UUID id) {
        this.orderRepository.deleteById(id);
    }

    public Order getOrder(UUID id) throws NotFoundException {
        return this.orderRepository.findById(id).orElseThrow(() -> new NotFoundException());
    }

}
