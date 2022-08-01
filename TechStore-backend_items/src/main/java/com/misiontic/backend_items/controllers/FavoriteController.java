package com.misiontic.backend_items.controllers;

import com.misiontic.backend_items.exceptions.InsufficientStockException;
import com.misiontic.backend_items.models.Favorite;
import com.misiontic.backend_items.repositories.FavoriteRepository;
import com.misiontic.backend_items.exceptions.FavoriteNotFoundException;
import com.misiontic.backend_items.models.Item;
import com.misiontic.backend_items.repositories.ItemRepository;
import com.misiontic.backend_items.exceptions.ItemNotFoundException;

import org.bson.types.ObjectId;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
public class FavoriteController {

    private final FavoriteRepository favoriteRepository;
    private final ItemRepository itemRepository;

    public FavoriteController(FavoriteRepository favoriteRepository, ItemRepository itemRepository){
        this.favoriteRepository = favoriteRepository;
        this.itemRepository     = itemRepository;
    }

    @PostMapping("/favorites")
    Favorite newFavorite(@RequestBody Favorite favorite){
        Item itemFavorite = itemRepository.findById(favorite.getProdRef()).orElse(null);

        if (itemFavorite == null){
            throw new ItemNotFoundException("Item reference " + favorite.getProdRef() +
                    " was not found. Operation rejected.");
        }

        if ( favorite.getProdUnits() == null){
            favorite.setProdUnits(0);
        }

        if ((itemFavorite.getInStock() - favorite.getProdUnits()) < 0){
            throw new InsufficientStockException("Not enough stock of product " + itemFavorite.getName() +
                    " with reference " + itemFavorite.getRef() + ". Operation rejected.");
        }

        itemFavorite.setInStock(itemFavorite.getInStock() - favorite.getProdUnits());
        itemRepository.save(itemFavorite);

        favorite.setDate(new Date());
        return favoriteRepository.save(favorite);
    }

    @GetMapping("/favorites/id/{id}")
    Favorite getFavorite(@PathVariable String id){
        Favorite userFavorite = favoriteRepository.findById(id).orElse(null);
        if (userFavorite == null){
            throw new FavoriteNotFoundException("Product not found in saved items. Operation rejected.");
        }
        return userFavorite;
    }

    @GetMapping("/favorites/{username}")
    List<Favorite> getUserFavorites(@PathVariable String username){
        List<Favorite> userFavorite = favoriteRepository.findByUsername(username);
        if (userFavorite.isEmpty()){
            throw new FavoriteNotFoundException("User has no saved items");
        }
        return userFavorite;
    }

    @PutMapping("/favorites/update")
    Favorite updateFavorite(@RequestBody Favorite favorite){

        Favorite favUpdate = favoriteRepository.findById(favorite.getId()).orElse(null);
        Item itemUpdate = itemRepository.findById(favUpdate.getProdRef()).orElse(null);

        if (favUpdate == null) {
            throw new FavoriteNotFoundException("Product not found in saved items. Operation rejected.");
        }

        if (itemUpdate == null){
            throw new ItemNotFoundException("Item reference " + favUpdate.getProdRef() +
                    " was not found. Operation rejected.");
        }

        if ((itemUpdate.getInStock() + favUpdate.getProdUnits() - favorite.getProdUnits() ) < 0 ){
            throw new InsufficientStockException("Not enough stock of product " + itemUpdate.getName() +
                    " with reference " + itemUpdate.getRef() + ". Operation rejected.");
        }

        itemUpdate.setInStock(itemUpdate.getInStock() + favUpdate.getProdUnits() - favorite.getProdUnits());
        itemRepository.save(itemUpdate);

        favUpdate.setProdUnits(favorite.getProdUnits());
        favUpdate.setDate(new Date());

        return favoriteRepository.save(favUpdate);
    }

    @DeleteMapping("/favorites/delete/{id}")
    String deleteFavorite(@PathVariable String id){
        Favorite favorite = favoriteRepository.findById(id).orElse(null);
        Item item = itemRepository.findById(favorite.getProdRef()).orElse(null);

        if (favorite == null) {
            throw new FavoriteNotFoundException("Product not found in saved items. Operation rejected.");
        }

        if (item == null){
            throw new ItemNotFoundException("Item reference " +
                    favorite.getProdRef() + " was not found. Operation rejected.");
        }

        item.setInStock(item.getInStock() + favorite.getProdUnits());
        itemRepository.save(item);

        favoriteRepository.deleteById(id);
        return "Delete Successful";
    }
}
