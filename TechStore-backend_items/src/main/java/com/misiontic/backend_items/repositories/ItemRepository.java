package com.misiontic.backend_items.repositories;

import com.misiontic.backend_items.models.Item;
import org.springframework.data.mongodb.repository.MongoRepository; //connecting to Mongo repository
import java.util.List;

public interface ItemRepository extends MongoRepository <Item, Integer> {
    List<Item> findByCategory (String category);
}
