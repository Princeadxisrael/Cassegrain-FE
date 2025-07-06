/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/cassegrain.json`.
 */
export type Cassegrain = {
  "address": "4FtfWh17cN7e8BReenNy9o7PjyvtY7HwFQChqdscmay5",
  "metadata": {
    "name": "cassegrain",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createEvent",
      "discriminator": [
        49,
        219,
        29,
        203,
        22,
        98,
        100,
        87
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "authority"
        },
        {
          "name": "events",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "arg",
                "path": "eventId"
              }
            ]
          }
        },
        {
          "name": "productBatch",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  116,
                  99,
                  104
                ]
              },
              {
                "kind": "arg",
                "path": "batchId"
              }
            ]
          }
        },
        {
          "name": "cassegrainConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "manufacturer",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  110,
                  117,
                  102,
                  97,
                  99,
                  116,
                  117,
                  114,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "batchId",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "eventId",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "eventType",
          "type": {
            "defined": {
              "name": "eventType"
            }
          }
        },
        {
          "name": "metadataIpfs",
          "type": {
            "option": "string"
          }
        },
        {
          "name": "orderStatus",
          "type": {
            "defined": {
              "name": "orderStatus"
            }
          }
        },
        {
          "name": "previousEvent",
          "type": {
            "option": "pubkey"
          }
        }
      ]
    },
    {
      "name": "delegateProduct",
      "docs": [
        "delegate event",
        ""
      ],
      "discriminator": [
        53,
        136,
        126,
        7,
        213,
        30,
        78,
        8
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "bufferProductBatch",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  117,
                  102,
                  102,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "productBatch"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                71,
                80,
                52,
                17,
                6,
                241,
                160,
                106,
                245,
                171,
                89,
                43,
                26,
                124,
                65,
                131,
                230,
                236,
                108,
                83,
                58,
                90,
                106,
                22,
                164,
                60,
                194,
                24,
                100,
                255,
                65,
                126
              ]
            }
          }
        },
        {
          "name": "delegationRecordProductBatch",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  101,
                  108,
                  101,
                  103,
                  97,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "productBatch"
              }
            ],
            "program": {
              "kind": "account",
              "path": "delegationProgram"
            }
          }
        },
        {
          "name": "delegationMetadataProductBatch",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  101,
                  108,
                  101,
                  103,
                  97,
                  116,
                  105,
                  111,
                  110,
                  45,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "productBatch"
              }
            ],
            "program": {
              "kind": "account",
              "path": "delegationProgram"
            }
          }
        },
        {
          "name": "productBatch",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  116,
                  99,
                  104
                ]
              },
              {
                "kind": "arg",
                "path": "batchId"
              }
            ]
          }
        },
        {
          "name": "bufferProductEvent",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  117,
                  102,
                  102,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "productEvent"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                71,
                80,
                52,
                17,
                6,
                241,
                160,
                106,
                245,
                171,
                89,
                43,
                26,
                124,
                65,
                131,
                230,
                236,
                108,
                83,
                58,
                90,
                106,
                22,
                164,
                60,
                194,
                24,
                100,
                255,
                65,
                126
              ]
            }
          }
        },
        {
          "name": "delegationRecordProductEvent",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  101,
                  108,
                  101,
                  103,
                  97,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "productEvent"
              }
            ],
            "program": {
              "kind": "account",
              "path": "delegationProgram"
            }
          }
        },
        {
          "name": "delegationMetadataProductEvent",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  101,
                  108,
                  101,
                  103,
                  97,
                  116,
                  105,
                  111,
                  110,
                  45,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "productEvent"
              }
            ],
            "program": {
              "kind": "account",
              "path": "delegationProgram"
            }
          }
        },
        {
          "name": "productEvent",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "arg",
                "path": "eventId"
              }
            ]
          }
        },
        {
          "name": "ownerProgram",
          "address": "5oNsyMZ8XYiGibvzHtm8Y6QzBSpm3i5TrdnpLaevHTU9"
        },
        {
          "name": "delegationProgram",
          "address": "DELeGGvXpWV2fqJUhqcF5ZSYMS4JTLjteaAMARRSaeSh"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "batchId",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "eventId",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    },
    {
      "name": "eventLog",
      "discriminator": [
        74,
        39,
        133,
        135,
        44,
        30,
        114,
        205
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "productBatch",
          "docs": [
            "The delegated Product Batch account (already on rollup)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  116,
                  99,
                  104
                ]
              },
              {
                "kind": "arg",
                "path": "batchId"
              }
            ]
          }
        },
        {
          "name": "productEvent",
          "docs": [
            "The delegated Product Event account (already on rollup)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "arg",
                "path": "eventId"
              }
            ]
          }
        },
        {
          "name": "magicProgram",
          "address": "Magic11111111111111111111111111111111111111"
        },
        {
          "name": "magicContext",
          "writable": true,
          "address": "MagicContext1111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "batchId",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "eventId",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "newProductStatus",
          "type": {
            "option": {
              "defined": {
                "name": "productStatus"
              }
            }
          }
        },
        {
          "name": "newOrderStatus",
          "type": {
            "option": {
              "defined": {
                "name": "orderStatus"
              }
            }
          }
        },
        {
          "name": "newEventType",
          "type": {
            "option": {
              "defined": {
                "name": "eventType"
              }
            }
          }
        },
        {
          "name": "previousEvent",
          "type": {
            "option": "pubkey"
          }
        },
        {
          "name": "nextEvent",
          "type": {
            "option": "pubkey"
          }
        },
        {
          "name": "metadataIpfs",
          "type": {
            "option": "string"
          }
        }
      ]
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "cassegrainConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "productRegistrationFee",
          "type": "u64"
        },
        {
          "name": "maxEventsPerProduct",
          "type": "u32"
        },
        {
          "name": "maxProductsPerManufacturer",
          "type": "u32"
        },
        {
          "name": "minEventInterval",
          "type": "i64"
        },
        {
          "name": "maxBatchSize",
          "type": "u8"
        }
      ]
    },
    {
      "name": "processUndelegation",
      "discriminator": [
        196,
        28,
        41,
        206,
        48,
        37,
        51,
        167
      ],
      "accounts": [
        {
          "name": "baseAccount",
          "writable": true
        },
        {
          "name": "buffer"
        },
        {
          "name": "payer",
          "writable": true
        },
        {
          "name": "systemProgram"
        }
      ],
      "args": [
        {
          "name": "accountSeeds",
          "type": {
            "vec": "bytes"
          }
        }
      ]
    },
    {
      "name": "registerManufacturer",
      "discriminator": [
        209,
        17,
        71,
        213,
        190,
        230,
        125,
        136
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "authority",
          "docs": [
            "CHECK : The authority of this program"
          ]
        },
        {
          "name": "cassegrainConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "manufacturer",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  110,
                  117,
                  102,
                  97,
                  99,
                  116,
                  117,
                  114,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "companyName",
          "type": "string"
        },
        {
          "name": "businessType",
          "type": {
            "defined": {
              "name": "businessType"
            }
          }
        },
        {
          "name": "certifications",
          "type": "string"
        }
      ]
    },
    {
      "name": "registerProductBatch",
      "docs": [
        "Register a new product"
      ],
      "discriminator": [
        137,
        143,
        114,
        143,
        15,
        177,
        24,
        224
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "authority"
        },
        {
          "name": "productBatch",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  116,
                  99,
                  104
                ]
              },
              {
                "kind": "arg",
                "path": "batchId"
              }
            ]
          }
        },
        {
          "name": "cassegrainConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "manufacturer",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  110,
                  117,
                  102,
                  97,
                  99,
                  116,
                  117,
                  114,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "batchId",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "metadataIpfs",
          "type": {
            "option": "string"
          }
        },
        {
          "name": "category",
          "type": {
            "defined": {
              "name": "productCategory"
            }
          }
        },
        {
          "name": "batchSize",
          "type": "u8"
        }
      ]
    },
    {
      "name": "undelegateProduct",
      "discriminator": [
        192,
        254,
        102,
        86,
        40,
        120,
        104,
        50
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "productBatch",
          "docs": [
            "The delegated Product Batch account (to be undelegated)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  116,
                  99,
                  104
                ]
              },
              {
                "kind": "arg",
                "path": "batchId"
              }
            ]
          }
        },
        {
          "name": "productEvent",
          "docs": [
            "The delegated Product Event account (to be undelegated)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "arg",
                "path": "eventId"
              }
            ]
          }
        },
        {
          "name": "magicProgram",
          "address": "Magic11111111111111111111111111111111111111"
        },
        {
          "name": "magicContext",
          "writable": true,
          "address": "MagicContext1111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "batchId",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "eventId",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "cassegrainConfig",
      "discriminator": [
        77,
        87,
        75,
        202,
        190,
        218,
        169,
        123
      ]
    },
    {
      "name": "manufacturerProfile",
      "discriminator": [
        247,
        86,
        163,
        220,
        39,
        35,
        134,
        167
      ]
    },
    {
      "name": "productBatch",
      "discriminator": [
        209,
        92,
        19,
        132,
        8,
        61,
        217,
        162
      ]
    },
    {
      "name": "productEvent",
      "discriminator": [
        186,
        156,
        3,
        125,
        9,
        168,
        30,
        225
      ]
    }
  ],
  "events": [
    {
      "name": "eventCreated",
      "discriminator": [
        59,
        186,
        199,
        175,
        242,
        25,
        238,
        94
      ]
    },
    {
      "name": "stateUpdated",
      "discriminator": [
        187,
        220,
        147,
        37,
        52,
        210,
        78,
        173
      ]
    },
    {
      "name": "supplyChainCompleted",
      "discriminator": [
        235,
        71,
        51,
        96,
        122,
        114,
        251,
        51
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "unauthorized",
      "msg": "Unauthorized action"
    },
    {
      "code": 6001,
      "name": "programPaused",
      "msg": "Program is paused"
    },
    {
      "code": 6002,
      "name": "productNotFound",
      "msg": "Product not found"
    },
    {
      "code": 6003,
      "name": "manufacturerNotFound",
      "msg": "Manufacturer not found"
    },
    {
      "code": 6004,
      "name": "invalidProductCategory",
      "msg": "Invalid product category"
    },
    {
      "code": 6005,
      "name": "invalidProductStatus",
      "msg": "Invalid product status"
    },
    {
      "code": 6006,
      "name": "invalidBusinessType",
      "msg": "Invalid business type"
    },
    {
      "code": 6007,
      "name": "insufficientRegistrationFee",
      "msg": "Insufficient funds for registration fee"
    },
    {
      "code": 6008,
      "name": "eventLimitExceeded",
      "msg": "Event limit exceeded for this product"
    },
    {
      "code": 6009,
      "name": "productAlreadyExists",
      "msg": "Product already exists"
    },
    {
      "code": 6010,
      "name": "manufacturerProfileExists",
      "msg": "Manufacturer profile already exists"
    },
    {
      "code": 6011,
      "name": "invalidShippingAddressFormat",
      "msg": "Invalid shipping address format"
    },
    {
      "code": 6012,
      "name": "invalidLocationData",
      "msg": "Location data is invalid or incomplete"
    },
    {
      "code": 6013,
      "name": "manufacturerNotVerified",
      "msg": "Manufacturer not verified"
    },
    {
      "code": 6014,
      "name": "invalidBatchSize",
      "msg": "Invalid batch size"
    },
    {
      "code": 6015,
      "name": "invalidIpfsHash",
      "msg": "Invalid IPFS hash"
    },
    {
      "code": 6016,
      "name": "batchNotFound",
      "msg": "Batch not found"
    },
    {
      "code": 6017,
      "name": "eventTooFrequent",
      "msg": "Events logged too frequently"
    },
    {
      "code": 6018,
      "name": "unauthorizedQualityCheck",
      "msg": "Unauthorized to perform quality checks"
    },
    {
      "code": 6019,
      "name": "unauthorizedCustomsEvent",
      "msg": "Unauthorized to log customs events"
    },
    {
      "code": 6020,
      "name": "eventAlreadyExists",
      "msg": "Event already exists"
    },
    {
      "code": 6021,
      "name": "invalidBatchId",
      "msg": "Invalid batch ID"
    },
    {
      "code": 6022,
      "name": "invalidEventId",
      "msg": "Invalid event ID"
    }
  ],
  "types": [
    {
      "name": "businessType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "manufacturer"
          },
          {
            "name": "distributor"
          },
          {
            "name": "retailer"
          },
          {
            "name": "logisticsProvider"
          },
          {
            "name": "qualityInspector"
          },
          {
            "name": "consumer"
          }
        ]
      }
    },
    {
      "name": "cassegrainConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "isPaused",
            "type": "bool"
          },
          {
            "name": "productRegistrationFee",
            "type": "u64"
          },
          {
            "name": "feeTreasury",
            "type": "pubkey"
          },
          {
            "name": "maxEventsPerProduct",
            "type": "u32"
          },
          {
            "name": "maxProductsPerManufacturer",
            "type": "u32"
          },
          {
            "name": "minEventInterval",
            "docs": [
              "Minimum time between events (seconds) - For spam protection"
            ],
            "type": "i64"
          },
          {
            "name": "maxBatchSize",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "eventCreated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "eventId",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "batchId",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "eventType",
            "type": {
              "defined": {
                "name": "eventType"
              }
            }
          },
          {
            "name": "actor",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "eventType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "register"
          },
          {
            "name": "manufactured"
          },
          {
            "name": "qualityCheck"
          },
          {
            "name": "packaged"
          },
          {
            "name": "shipped"
          },
          {
            "name": "inTransit"
          },
          {
            "name": "delivered"
          },
          {
            "name": "sold"
          },
          {
            "name": "recalled"
          },
          {
            "name": "qualityFailed"
          },
          {
            "name": "ownershipTransfer"
          },
          {
            "name": "locationUpdate"
          },
          {
            "name": "customsCleared"
          }
        ]
      }
    },
    {
      "name": "manufacturerProfile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "companyName",
            "type": "string"
          },
          {
            "name": "businessType",
            "type": {
              "defined": {
                "name": "businessType"
              }
            }
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "certifications",
            "type": "string"
          },
          {
            "name": "isVerified",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "orderStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "pending"
          },
          {
            "name": "confirmed"
          },
          {
            "name": "processing"
          },
          {
            "name": "shipped"
          },
          {
            "name": "inTransit"
          },
          {
            "name": "delivered"
          },
          {
            "name": "completed"
          },
          {
            "name": "cancelled"
          },
          {
            "name": "disputed"
          },
          {
            "name": "refunded"
          }
        ]
      }
    },
    {
      "name": "productBatch",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "batchId",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "manufacturerName",
            "type": "string"
          },
          {
            "name": "status",
            "type": {
              "defined": {
                "name": "productStatus"
              }
            }
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "lastUpdated",
            "type": "i64"
          },
          {
            "name": "metadataIpfs",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "authenticityVerified",
            "type": "bool"
          },
          {
            "name": "category",
            "type": {
              "defined": {
                "name": "productCategory"
              }
            }
          },
          {
            "name": "manufacturer",
            "type": "pubkey"
          },
          {
            "name": "eventAccount",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "totalEvents",
            "type": "u32"
          },
          {
            "name": "batchSize",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "productCategory",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "electronics"
          },
          {
            "name": "automotive"
          },
          {
            "name": "pharmaceuticals"
          },
          {
            "name": "food"
          },
          {
            "name": "textiles"
          },
          {
            "name": "luxury"
          },
          {
            "name": "industrial"
          },
          {
            "name": "other"
          }
        ]
      }
    },
    {
      "name": "productEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "eventId",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "batchId",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "productEventType",
            "type": {
              "defined": {
                "name": "eventType"
              }
            }
          },
          {
            "name": "actor",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "metadataIpfs",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "verificationStatus",
            "type": {
              "defined": {
                "name": "verificationStatus"
              }
            }
          },
          {
            "name": "orderStatus",
            "type": {
              "defined": {
                "name": "orderStatus"
              }
            }
          },
          {
            "name": "previousEvent",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "nextEvent",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "bumps",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "productStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "registered"
          },
          {
            "name": "created"
          },
          {
            "name": "manufactured"
          },
          {
            "name": "inTransit"
          },
          {
            "name": "inWarehouse"
          },
          {
            "name": "forSale"
          },
          {
            "name": "sold"
          },
          {
            "name": "delivered"
          },
          {
            "name": "recalled"
          },
          {
            "name": "destroyed"
          }
        ]
      }
    },
    {
      "name": "stateUpdated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "batchId",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "eventId",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "updatedBy",
            "type": "pubkey"
          },
          {
            "name": "batchStatus",
            "type": {
              "defined": {
                "name": "productStatus"
              }
            }
          },
          {
            "name": "orderStatus",
            "type": {
              "defined": {
                "name": "orderStatus"
              }
            }
          },
          {
            "name": "eventType",
            "type": {
              "defined": {
                "name": "eventType"
              }
            }
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "supplyChainCompleted",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "batchId",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "eventId",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "finalStatus",
            "type": {
              "defined": {
                "name": "productStatus"
              }
            }
          },
          {
            "name": "finalOrderStatus",
            "type": {
              "defined": {
                "name": "orderStatus"
              }
            }
          },
          {
            "name": "verificationStatus",
            "type": {
              "defined": {
                "name": "verificationStatus"
              }
            }
          },
          {
            "name": "totalEvents",
            "type": "u32"
          },
          {
            "name": "completedBy",
            "type": "pubkey"
          },
          {
            "name": "completionTimestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "verificationStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "pending"
          },
          {
            "name": "verified"
          },
          {
            "name": "failed"
          },
          {
            "name": "disputed"
          }
        ]
      }
    }
  ]
};
