package com.bookfox.util;

import java.util.*;

public class CategoryMapper {

    private static final Map<String, List<String>> CATEGORY_MAPPING = new HashMap<>() {{
        put("FICTION", Arrays.asList("Fiction", "Literary", "Thrillers", "Romance", "Mystery", "Fantasy", "Science Fiction"));
        put("NONFICTION", Arrays.asList("Nonfiction", "Biography & Autobiography", "History", "Business & Economics", "Self-Help"));
        put("CHILDRENS BOOKS", Arrays.asList("Juvenile Fiction", "Juvenile Nonfiction", "Children's Books"));
        put("HEALTH&FITNESS", Arrays.asList("Health & Fitness", "Medical", "Diet", "Nutrition"));
        put("COOKING FOOD&WINE", Arrays.asList("Cooking", "Food & Wine", "Cookbooks"));
        put("ART&PHOTOGRAPHY", Arrays.asList("Art", "Photography", "Graphic Design"));
        put("MUSIC", Arrays.asList("Music", "Performing Arts"));
        put("RELIGION&SPIRITUALITY", Arrays.asList("Religion", "Spirituality", "Philosophy"));
        put("TRAVEL", Arrays.asList("Travel", "Adventure"));
        put("SCIENCE", Arrays.asList("Science", "Nature", "Technology", "Computers"));
    }};

    private static final Map<String, Integer> CATEGORY_CODE_MAPPING = new HashMap<>() {{
        put("FICTION", 1);
        put("NONFICTION", 2);
        put("CHILDRENS BOOKS", 3);
        put("HEALTH&FITNESS", 4);
        put("COOKING FOOD&WINE", 5);
        put("ART&PHOTOGRAPHY", 6);
        put("MUSIC", 7);
        put("RELIGION&SPIRITUALITY", 8);
        put("TRAVEL", 9);
        put("SCIENCE", 10);
        put("etc", 11);
    }};

    public static int mapCategory(List<String> categories) {
        if (categories == null || categories.isEmpty()) {
            return CATEGORY_CODE_MAPPING.get("etc");
        }

        for (String category : categories) {
            String[] splitCategories = category.split("/");
            for (String subCategory : splitCategories) {
                subCategory = subCategory.trim();

                for (Map.Entry<String, List<String>> entry : CATEGORY_MAPPING.entrySet()) {
                    String key = entry.getKey();
                    List<String> keywords = entry.getValue();

                    for (String keyword : keywords) {
                        if (subCategory.toLowerCase().contains(keyword.toLowerCase())) {
                            return CATEGORY_CODE_MAPPING.get(key);
                        }
                    }
                }
            }
        }

        return CATEGORY_CODE_MAPPING.get("etc");
    }
}
