package com.misiontic.backend_items.controllers;

import com.misiontic.backend_items.exceptions.FavoriteNotFoundException;
import com.misiontic.backend_items.exceptions.InsufficientStockException;
import com.misiontic.backend_items.models.Favorite;
import com.misiontic.backend_items.repositories.FavoriteRepository;
import com.misiontic.backend_items.models.Item;
import com.misiontic.backend_items.repositories.ItemRepository;
import com.misiontic.backend_items.exceptions.ItemNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
public class ItemController {

    private final ItemRepository itemRepository;
    private final FavoriteRepository favoriteRepository;

    public ItemController(ItemRepository itemRepository, FavoriteRepository favoriteRepository){
        this.itemRepository = itemRepository;
        this.favoriteRepository = favoriteRepository;
    }

    @GetMapping("/")
    String messageRest(){
        return "Welcome to Items_MS";
    }

    @GetMapping("/items/home/{nItems}")
    List<Item> getSomeItems(@PathVariable Integer nItems){
        //int numberItems = 3;
        List<Item> allItems = itemRepository.findAll();
        Collections.shuffle(allItems);
        return allItems.subList(0, nItems);
    }

    @GetMapping("/items/id/{ref}")
    Item getItem(@PathVariable Integer ref){
        return itemRepository.findById(ref)
                .orElseThrow(() -> new ItemNotFoundException("Item reference was not found: " + ref));
    }

    @GetMapping("/items/categories/{category}")
    List<Item> getItemCategory(@PathVariable String category) {
        List<Item> itemCategory = itemRepository.findByCategory(category);
        return itemCategory;
    }

    @PostMapping("/items")
    Item newItem(@RequestBody Item item){
        return itemRepository.save(item);
    }

    @PutMapping("/items/update")
    Item updateItem(@RequestBody Item item){
        Item itemUpdate = itemRepository.findById(item.getRef()).orElse(null);

        if (itemUpdate == null) {
            throw new ItemNotFoundException("No se encontró un producto con la referencia " +
                    itemUpdate.getRef() + ", operación rechazada.");
        }
        if (item.getInStock() == null){
            itemUpdate.setPrice(item.getPrice());
            return itemRepository.save(itemUpdate);
        } else if ( item.getInStock() >= 0){
            itemUpdate.setPrice(item.getPrice());
            itemUpdate.setInStock(item.getInStock());
            return itemRepository.save(itemUpdate);
        } else {
            throw new InsufficientStockException("Ingrese un número válido de unidades del producto " +
                    itemUpdate.getName() + " con referencia " + itemUpdate.getRef() + ", operación rechazada.");
        }
    }

    @DeleteMapping("/items/delete/{ref}")
    String deleteItem(@PathVariable Integer ref){
        List<Favorite> favorite = favoriteRepository.findByProdRef(ref);
        Item item = itemRepository.findById(ref).orElse(null);

        if (item == null){
            throw new ItemNotFoundException("No se encontró un producto con la referencia " +
                    ref + ", operación rechazada.");
        }

        if (favorite == null) {
            throw new FavoriteNotFoundException("No hay productos con referencia: " + ref + " guardados en favoritos.");
        }
        // this will delete a given item by its Id - ref
        itemRepository.deleteById(ref);

        // This should remove all elements in favorites that include the item deleted above
        favoriteRepository.deleteAll(favorite);

        return "Borrado exitoso";
    }
}
