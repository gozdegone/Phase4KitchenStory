package com.kitchenstory.services;

import com.kitchenstory.model.entity.Product;
import com.kitchenstory.repository.ProductRepository;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public void addProduct(Product product) {
        this.productRepository.save(product);
    }

    public List<Product> listProducts() throws NotFoundException {
        List<Product> products = this.productRepository.findAll();
        if (CollectionUtils.isEmpty(products)) {
            throw new NotFoundException();
        }
        return products;
    }

    public void deleteProduct(UUID id) {
        this.productRepository.deleteById(id);
    }

    public void updateProduct(UUID id, Product updateProduct) throws NotFoundException {
        Product product = this.productRepository.findById(id).orElseThrow(() -> new NotFoundException());

        product.setName(updateProduct.getName())
            .setPid(updateProduct.getPid())
            .setCategory(updateProduct.getCategory())
            .setBrand(updateProduct.getBrand())
            .setIngredient(updateProduct.getIngredient())
            .setOrigin(updateProduct.getOrigin())
            .setPrice(updateProduct.getPrice())
            .setQuantity(updateProduct.getQuantity());

        this.productRepository.save(product);
    }

    public Product getProduct(UUID id) throws NotFoundException {
        return this.productRepository.findById(id).orElseThrow(() -> new NotFoundException());
    }

    public List<Product> getAllByName(String name) throws NotFoundException {
        List<Product> products = this.productRepository.findByNameContainingIgnoreCase(name);
        if (CollectionUtils.isEmpty(products)) {
            throw new NotFoundException();
        }
        return products;
    }

}
