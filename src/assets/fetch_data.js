export let catalogs = [{
    "id": "59edae5be4b0c81a048e8491",
    "oosCompanyId": 1234,
    "company": "59dcd421e4b0bc51008ea0dc",
    "views": [
        {
            "viewId": 1,
            "name": {
                "de": "Online Bestellung",
                "en": "online order"
            }
        },
        {
            "viewId": 2,
            "name": {
                "de": "Restaurant",
                "en": "Restaurant"
            }
        },
        {
            "viewId": 3,
            "name": {
                "de": "Mittagsmenü",
                "en": "Lunch menu"
            }
        },
        {
            "viewId": 4,
            "name": {
                "de": "Abholtheke",
                "en": "Take away"
            }
        }
    ],
    "version": 1,
    "status": "inactive",
    "createdOn": "2017-10-23T08:54:51.207+0000",
    "createdBy": "12345",
    "modifiedOn": "2017-11-13T10:43:01.338+0000",
    "modifiedBy": "12345"
},
{
    "id": "5a097735e4b0c02db814bb59",
    "oosCompanyId": 1234,
    "company": "59dcd421e4b0bc51008ea0dc",
    "views": [
        {
            "viewId": 1,
            "name": {
                "de": "Online Bestellung",
                "en": "online order"
            }
        },
        {
            "viewId": 2,
            "name": {
                "de": "Restaurant",
                "en": "Restaurant"
            }
        },
        {
            "viewId": 3,
            "name": {
                "de": "Mittagsmenü",
                "en": "Lunch menu"
            }
        },
        {
            "viewId": 4,
            "name": {
                "de": "Abholtheke",
                "en": "Take away"
            }
        }
    ],
    "version": 2,
    "status": "inactive",
    "createdOn": "2017-11-13T10:43:01.375+0000",
    "createdBy": "12345",
    "modifiedOn": "2017-11-13T23:48:30.744+0000",
    "modifiedBy": "12345"
},
{
    "id": "5a0a2f4ee4b0c02db81529e9",
    "oosCompanyId": 1234,
    "company": "59dcd421e4b0bc51008ea0dc",
    "views": [
        {
            "viewId": 1,
            "name": {
                "en": "Online"
            }
        },
        {
            "viewId": 2,
            "name": {
                "en": "Takeaway"
            }
        },
        {
            "viewId": 3,
            "name": {
                "en": "Restaurant"
            }
        }
    ],
    "version": 3,
    "status": "active",
    "createdOn": "2017-11-13T23:48:30.774+0000",
    "createdBy": "12345",
    "modifiedOn": "2017-11-13T23:48:30.774+0000",
    "modifiedBy": "12345"
}]

export let catalog = {
    "status": "Success",
    "statusText": "Catalog:Get successful.",
    "catalog": {
        "id": "59edae5be4b0c81a048e8491",
        "oosCompanyId": 1234,
        "company": "59dcd421e4b0bc51008ea0dc",
        "itemsList": [
            {
                "itemId": 1,
                "abbr": {
                    "en": "p1",
                    "de": "X1"
                },
                "name": {
                    "en": "Poppadoms & Pickles"
                },
                "desc": {
                    "en": "some food with interesting name",
                    "de": "groassartiges essen"
                },
                "vatRate": 0,
                "sizes": [
                    {
                        "name": {
                            "en": "small"
                        },
                        "price": 5
                    }
                ],
                "options": [
                    {
                        "name": {
                            "en": "Garlic"
                        },
                        "price": 1
                    }
                ],
                "styles": [
                    {
                        "name": {
                            "en": "Normal"
                        }
                    }
                ],
                "views": [
                    1,
                    3
                ],
                "items": [
                    {
                        "itemId": 2,
                        "abbr": {},
                        "name": {
                            "en": "1. Curry Special"
                        },
                        "desc": {},
                        "vatRate": 13,
                        "sizes": [
                            {
                                "name": {
                                    "en": "small"
                                },
                                "price": 5
                            },
                            {
                                "name": {
                                    "en": "medium"
                                },
                                "price": 7
                            },
                            {
                                "name": {
                                    "en": "large"
                                },
                                "price": 7
                            }
                        ],
                        "options": [
                            {
                                "name": {
                                    "en": "Extra onions"
                                },
                                "price": 1
                            }
                        ],
                        "styles": [
                            {
                                "name": {
                                    "en": "Normal"
                                }
                            }
                        ],
                        "variants": [
                            {
                                "name": {
                                    "en": "Vegetables"
                                },
                                "price": 2
                            },
                            {
                                "name": {
                                    "en": "Chicken"
                                },
                                "price": 2
                            },
                            {
                                "name": {
                                    "en": "Beef"
                                },
                                "price": 2
                            }
                        ],
                        "settings": {
                            "labelPrint": true,
                            "askDetails": true
                        },
                        "views": [
                            1,
                            3
                        ]
                    }
                ]
            },
            {
                "itemId": 2,
                "abbr": {
                    "en": "p2",
                    "de": "X2"
                },
                "name": {
                    "en": "Pizzas"
                },
                "desc": {
                    "en": "italian pizzas",
                    "de": "Italienische Köstlichkeiten"
                },
                "vatRate": 0,
                "sizes": [
                    {
                        "name": {
                            "en": "small"
                        },
                        "price": 5.5
                    },
                    {
                        "name": {
                            "en": "medium"
                        },
                        "price": 7.5
                    },
                    {
                        "name": {
                            "en": "large"
                        },
                        "price": 9.5
                    },
                    {
                        "name": {
                            "en": "party"
                        },
                        "price": 15
                    }
                ],
                "options": [
                    {
                        "name": {
                            "en": "Garlic"
                        },
                        "price": 1
                    },
                    {
                        "name": {
                            "en": "Pepperoni"
                        },
                        "price": 0.75
                    }
                ],
                "styles": [
                    {
                        "name": {
                            "en": "Normal"
                        }
                    }
                ],
                "views": [
                    1,
                    3
                ],
                "items": [
                    {
                        "itemId": 22,
                        "abbr": {
                            "en": "p2level2",
                            "de": "X2level2"
                        },
                        "name": {
                            "en": "Vegetarian"
                        },
                        "desc": {
                            "en": "vegetarian specials",
                            "de": "Vegetarische Spezialitäten"
                        },
                        "vatRate": 0,
                        "sizes": [],
                        "options": [
                            {
                                "name": {
                                    "en": "Spinache",
                                    "de": "Spinat"
                                },
                                "price": 1
                            },
                            {
                                "name": {
                                    "en": "Broccoli",
                                    "de": "Brokkoli"
                                },
                                "price": 1.25
                            }
                        ],
                        "styles": [],
                        "views": [
                            1,
                            3
                        ],
                        "items": [
                            {
                                "itemId": 221,
                                "abbr": {
                                    "en": "P221",
                                    "de": "X221"
                                },
                                "name": {
                                    "en": "Vegetarian Pizza #1"
                                },
                                "desc": {},
                                "vatRate": 10,
                                "sizes": [],
                                "options": [],
                                "styles": [],
                                "variants": [
                                    {
                                        "name": {
                                            "en": "Vegetables"
                                        },
                                        "price": 2
                                    },
                                    {
                                        "name": {
                                            "en": "Chicken"
                                        },
                                        "price": 2
                                    },
                                    {
                                        "name": {
                                            "en": "Beef"
                                        },
                                        "price": 2
                                    }
                                ],
                                "settings": {
                                    "labelPrint": true,
                                    "askDetails": true
                                },
                                "views": [
                                    1,
                                    3
                                ]
                            },
                            {
                                "itemId": 225,
                                "abbr": {
                                    "en": "P2212",
                                    "de": "X2212"
                                },
                                "name": {
                                    "en": "Vegetarian Pizza #2"
                                },
                                "desc": {},
                                "vatRate": 10,
                                "sizes": [],
                                "options": [],
                                "styles": [],
                                "variants": [
                                    {
                                        "name": {
                                            "en": "Vegetables"
                                        },
                                        "price": 2
                                    },
                                    {
                                        "name": {
                                            "en": "Chicken"
                                        },
                                        "price": 2
                                    },
                                    {
                                        "name": {
                                            "en": "Beef"
                                        },
                                        "price": 2
                                    }
                                ],
                                "settings": {
                                    "labelPrint": true,
                                    "askDetails": false
                                },
                                "views": [
                                    1,
                                    3
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        "views": [
            {
                "viewId": 1,
                "name": {
                    "de": "Online Bestellung",
                    "en": "online order"
                }
            },
            {
                "viewId": 2,
                "name": {
                    "de": "Restaurant",
                    "en": "Restaurant"
                }
            },
            {
                "viewId": 3,
                "name": {
                    "de": "Mittagsmenü",
                    "en": "Lunch menu"
                }
            },
            {
                "viewId": 4,
                "name": {
                    "de": "Abholtheke",
                    "en": "Take away"
                }
            }
        ],
        "version": 1,
        "status": "inactive",
        "createdOn": "2017-10-23T08:54:51.207+0000",
        "createdBy": "12345",
        "modifiedOn": "2017-11-13T10:43:01.338+0000",
        "modifiedBy": "12345"
    }
}