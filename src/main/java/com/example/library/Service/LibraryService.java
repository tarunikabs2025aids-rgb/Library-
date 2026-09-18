package com.example.library.Service;

import com.example.library.Entity.Library;
import com.example.library.Repository.LibraryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LibraryService {

    private final LibraryRepository libraryRepository;

    public LibraryService(LibraryRepository libraryRepository) {
        this.libraryRepository = libraryRepository;
    }

    // CREATE
    public Library createLibrary(Library library) {
        return libraryRepository.save(library);
    }

    // READ ALL
    public List<Library> getAllLibraries() {
        return libraryRepository.findAll();
    }

    // READ ONE
    public Optional<Library> getLibraryById(Long id) {
        return libraryRepository.findById(id);
    }

    // DELETE
    public void deleteLibrary(Long id) {
        libraryRepository.deleteById(id);
    }
}
