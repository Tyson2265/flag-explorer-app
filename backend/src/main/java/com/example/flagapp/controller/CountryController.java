package com.example.flagapp.controller;

import com.example.flagapp.model.Country;
import com.example.flagapp.model.CountryDetails;
import com.example.flagapp.service.CountryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/countries")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class CountryController {
    private final CountryService countryService;

    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }

    @GetMapping
    public List<Country> getAllCountries() {
        return countryService.getAllCountries();
    }

    @GetMapping("/{name}")
    public CountryDetails getCountryDetails(@PathVariable String name) {
        return countryService.getCountryDetails(name);
    }
}