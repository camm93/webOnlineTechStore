package com.misiontic.backend_items.repositories;

import com.misiontic.backend_items.models.Favorite;
import org.springframework.data.mongodb.repository.MongoRepository; //connecting to Mongo repository
import java.util.List;

public interface FavoriteRepository extends MongoRepository <Favorite, String> {
    List<Favorite> findByUsername (String username);
    List<Favorite> findByProdRef (Integer prodRef);
}
