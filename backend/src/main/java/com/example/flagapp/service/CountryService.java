package com.example.flagapp.service;

import com.example.flagapp.model.Country;
import com.example.flagapp.model.CountryDetails;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class CountryService {
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public CountryService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public List<Country> getAllCountries() {
        String url = "https://restcountries.com/v3.1/all?fields=name,flags";
        JsonNode response = restTemplate.getForObject(url, JsonNode.class);
        List<Country> countries = new ArrayList<>();

        if (response != null && response.isArray()) {
            for (JsonNode node : response) {
                Country country = new Country();
                country.setName(node.get("name").get("common").asText());
                country.setFlag(node.get("flags").get("png").asText());
                countries.add(country);
            }
        }
        return countries;
    }

    public CountryDetails getCountryDetails(String name) {
        String url = "https://restcountries.com/v3.1/name/" + name + "?fields=name,population,capital,flags";
        JsonNode response = restTemplate.getForObject(url, JsonNode.class);

        if (response != null && response.isArray() && response.size() > 0) {
            JsonNode countryNode = response.get(0);
            CountryDetails details = new CountryDetails();
            details.setName(countryNode.get("name").get("common").asText());
            details.setPopulation(countryNode.get("population").asInt());
            details.setCapital(countryNode.get("capital").get(0).asText());
            details.setFlag(countryNode.get("flags").get("png").asText());
            return details;
        }
        return null;
    }
}