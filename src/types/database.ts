export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      addresses: {
        Row: {
          address_detail: string;
          address_id: number;
          address_title: string | null;
          city: string | null;
          country: string | null;
          country_code: string | null;
          country_id: number;
          country_name: string | null;
          created_at: string;
          is_default: boolean;
          province: string | null;
          uid: string;
          updated_at: string;
          zip: string | null;
        };
        Insert: {
          address_detail: string;
          address_id?: never;
          address_title?: string | null;
          city?: string | null;
          country?: string | null;
          country_code?: string | null;
          country_id: number;
          country_name?: string | null;
          created_at?: string;
          is_default?: boolean;
          province?: string | null;
          uid: string;
          updated_at?: string;
          zip?: string | null;
        };
        Update: {
          address_detail?: string;
          address_id?: never;
          address_title?: string | null;
          city?: string | null;
          country?: string | null;
          country_code?: string | null;
          country_id?: number;
          country_name?: string | null;
          created_at?: string;
          is_default?: boolean;
          province?: string | null;
          uid?: string;
          updated_at?: string;
          zip?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'addresses_country_id_fkey';
            columns: ['country_id'];
            referencedRelation: 'countries';
            referencedColumns: ['country_id'];
          },
          {
            foreignKeyName: 'addresses_uid_fkey';
            columns: ['uid'];
            referencedRelation: 'users';
            referencedColumns: ['uid'];
          }
        ];
      };
      cart_details: {
        Row: {
          cart_detail_id: number;
          cart_id: number;
          created_at: string;
          price_id: number;
          quantity: number;
        };
        Insert: {
          cart_detail_id?: never;
          cart_id: number;
          created_at?: string;
          price_id: number;
          quantity?: number;
        };
        Update: {
          cart_detail_id?: never;
          cart_id?: number;
          created_at?: string;
          price_id?: number;
          quantity?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'cart_details_cart_id_fkey';
            columns: ['cart_id'];
            referencedRelation: 'carts';
            referencedColumns: ['cart_id'];
          },
          {
            foreignKeyName: 'cart_details_price_id_fkey';
            columns: ['price_id'];
            referencedRelation: 'prices';
            referencedColumns: ['price_id'];
          }
        ];
      };
      cart_item_type: {
        Row: {
          created: string;
          description: string | null;
          id: number;
          updated: string | null;
        };
        Insert: {
          created?: string;
          description?: string | null;
          id?: number;
          updated?: string | null;
        };
        Update: {
          created?: string;
          description?: string | null;
          id?: number;
          updated?: string | null;
        };
        Relationships: [];
      };
      cart_status: {
        Row: {
          cart_status_id: number;
          description: string;
        };
        Insert: {
          cart_status_id?: number;
          description: string;
        };
        Update: {
          cart_status_id?: number;
          description?: string;
        };
        Relationships: [];
      };
      carts: {
        Row: {
          cart_id: number;
          cart_status_id: number;
          created_at: string;
          uid: string;
          updated_at: string;
        };
        Insert: {
          cart_id?: never;
          cart_status_id: number;
          created_at?: string;
          uid: string;
          updated_at?: string;
        };
        Update: {
          cart_id?: never;
          cart_status_id?: number;
          created_at?: string;
          uid?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'carts_cart_status_id_fkey';
            columns: ['cart_status_id'];
            referencedRelation: 'cart_status';
            referencedColumns: ['cart_status_id'];
          },
          {
            foreignKeyName: 'carts_uid_fkey';
            columns: ['uid'];
            referencedRelation: 'users';
            referencedColumns: ['uid'];
          }
        ];
      };
      collections: {
        Row: {
          collection_id: number;
          created_at: string;
          default_image_alt: string | null;
          default_image_url: string | null;
          description: string;
          detailed_description_en: string | null;
          detailed_description_tr: string | null;
          handle: string | null;
          updated_at: string;
        };
        Insert: {
          collection_id?: number;
          created_at?: string;
          default_image_alt?: string | null;
          default_image_url?: string | null;
          description: string;
          detailed_description_en?: string | null;
          detailed_description_tr?: string | null;
          handle?: string | null;
          updated_at?: string;
        };
        Update: {
          collection_id?: number;
          created_at?: string;
          default_image_alt?: string | null;
          default_image_url?: string | null;
          description?: string;
          detailed_description_en?: string | null;
          detailed_description_tr?: string | null;
          handle?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      countries: {
        Row: {
          continent: Database['public']['Enums']['continents'] | null;
          country_id: number;
          iso2: string;
          iso3: string | null;
          local_name: string | null;
          name: string | null;
        };
        Insert: {
          continent?: Database['public']['Enums']['continents'] | null;
          country_id?: number;
          iso2: string;
          iso3?: string | null;
          local_name?: string | null;
          name?: string | null;
        };
        Update: {
          continent?: Database['public']['Enums']['continents'] | null;
          country_id?: number;
          iso2?: string;
          iso3?: string | null;
          local_name?: string | null;
          name?: string | null;
        };
        Relationships: [];
      };
      delivery_organizations: {
        Row: {
          created_at: string;
          delivery_organization_id: number;
          description: string;
        };
        Insert: {
          created_at?: string;
          delivery_organization_id?: number;
          description: string;
        };
        Update: {
          created_at?: string;
          delivery_organization_id?: number;
          description?: string;
        };
        Relationships: [];
      };
      dynamic_pages: {
        Row: {
          content: string;
          created: string;
          id: number;
          name: string;
          updated: string | null;
        };
        Insert: {
          content: string;
          created?: string;
          id?: number;
          name: string;
          updated?: string | null;
        };
        Update: {
          content?: string;
          created?: string;
          id?: number;
          name?: string;
          updated?: string | null;
        };
        Relationships: [];
      };
      instaprint: {
        Row: {
          created_at: string | null;
          insta_id: string;
          instaprint_id: number;
          media_url: string;
          payload: Json;
          quantity: number;
          username: string | null;
          variant_id: string;
        };
        Insert: {
          created_at?: string | null;
          insta_id: string;
          instaprint_id: number;
          media_url: string;
          payload: Json;
          quantity: number;
          username?: string | null;
          variant_id: string;
        };
        Update: {
          created_at?: string | null;
          insta_id?: string;
          instaprint_id?: number;
          media_url?: string;
          payload?: Json;
          quantity?: number;
          username?: string | null;
          variant_id?: string;
        };
        Relationships: [];
      };
      lexica: {
        Row: {
          image_url: string | null;
          lexica_image_id: number;
          negative_prompt: string | null;
          positive_prompt: string | null;
        };
        Insert: {
          image_url?: string | null;
          lexica_image_id: number;
          negative_prompt?: string | null;
          positive_prompt?: string | null;
        };
        Update: {
          image_url?: string | null;
          lexica_image_id?: number;
          negative_prompt?: string | null;
          positive_prompt?: string | null;
        };
        Relationships: [];
      };
      order_status: {
        Row: {
          created_at: string;
          description: string;
          order_status_id: number;
        };
        Insert: {
          created_at?: string;
          description: string;
          order_status_id?: number;
        };
        Update: {
          created_at?: string;
          description?: string;
          order_status_id?: number;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          address_id: number;
          cart_id: number;
          created_at: string;
          delivery_organization_id: number;
          order_id: number;
          order_status_id: number;
          payment_collector_id: number;
          payment_provider_response: Json | null;
          payment_provider_token: string | null;
          total_price: number;
          total_tax: number;
          tracking_reference: string | null;
          tracking_url: string | null;
          uid: string;
          updated_at: string;
        };
        Insert: {
          address_id: number;
          cart_id: number;
          created_at?: string;
          delivery_organization_id: number;
          order_id?: never;
          order_status_id: number;
          payment_collector_id: number;
          payment_provider_response?: Json | null;
          payment_provider_token?: string | null;
          total_price: number;
          total_tax: number;
          tracking_reference?: string | null;
          tracking_url?: string | null;
          uid: string;
          updated_at?: string;
        };
        Update: {
          address_id?: number;
          cart_id?: number;
          created_at?: string;
          delivery_organization_id?: number;
          order_id?: never;
          order_status_id?: number;
          payment_collector_id?: number;
          payment_provider_response?: Json | null;
          payment_provider_token?: string | null;
          total_price?: number;
          total_tax?: number;
          tracking_reference?: string | null;
          tracking_url?: string | null;
          uid?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'orders_address_id_fkey';
            columns: ['address_id'];
            referencedRelation: 'addresses';
            referencedColumns: ['address_id'];
          },
          {
            foreignKeyName: 'orders_cart_id_fkey';
            columns: ['cart_id'];
            referencedRelation: 'carts';
            referencedColumns: ['cart_id'];
          },
          {
            foreignKeyName: 'orders_delivery_organization_id_fkey';
            columns: ['delivery_organization_id'];
            referencedRelation: 'delivery_organizations';
            referencedColumns: ['delivery_organization_id'];
          },
          {
            foreignKeyName: 'orders_order_status_id_fkey';
            columns: ['order_status_id'];
            referencedRelation: 'order_status';
            referencedColumns: ['order_status_id'];
          },
          {
            foreignKeyName: 'orders_payment_collector_id_fkey';
            columns: ['payment_collector_id'];
            referencedRelation: 'payment_collectors';
            referencedColumns: ['payment_collector_id'];
          },
          {
            foreignKeyName: 'orders_uid_fkey';
            columns: ['uid'];
            referencedRelation: 'users';
            referencedColumns: ['uid'];
          }
        ];
      };
      payment_collectors: {
        Row: {
          created_at: string;
          description: string;
          payment_collector_id: number;
        };
        Insert: {
          created_at?: string;
          description: string;
          payment_collector_id?: number;
        };
        Update: {
          created_at?: string;
          description?: string;
          payment_collector_id?: number;
        };
        Relationships: [];
      };
      prices: {
        Row: {
          country_id: number;
          created_at: string;
          currency: string;
          finish_at: string | null;
          is_active: boolean;
          price: number;
          price_id: number;
          product_id: number;
          product_option_id: number;
          shipping_cost: number;
          shopify_variant_id: number | null;
          start_at: string | null;
        };
        Insert: {
          country_id: number;
          created_at?: string;
          currency: string;
          finish_at?: string | null;
          is_active: boolean;
          price: number;
          price_id?: never;
          product_id: number;
          product_option_id: number;
          shipping_cost: number;
          shopify_variant_id?: number | null;
          start_at?: string | null;
        };
        Update: {
          country_id?: number;
          created_at?: string;
          currency?: string;
          finish_at?: string | null;
          is_active?: boolean;
          price?: number;
          price_id?: never;
          product_id?: number;
          product_option_id?: number;
          shipping_cost?: number;
          shopify_variant_id?: number | null;
          start_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'prices_country_id_fkey';
            columns: ['country_id'];
            referencedRelation: 'countries';
            referencedColumns: ['country_id'];
          },
          {
            foreignKeyName: 'prices_product_id_fkey';
            columns: ['product_id'];
            referencedRelation: 'products';
            referencedColumns: ['product_id'];
          },
          {
            foreignKeyName: 'prices_product_option_id_fkey';
            columns: ['product_option_id'];
            referencedRelation: 'product_options';
            referencedColumns: ['product_option_id'];
          }
        ];
      };
      product_accessories: {
        Row: {
          product_accessory_id: number;
          product_id: number;
          product_id2: number;
        };
        Insert: {
          product_accessory_id?: never;
          product_id: number;
          product_id2: number;
        };
        Update: {
          product_accessory_id?: never;
          product_id?: number;
          product_id2?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'product_accessories_product_id_fkey';
            columns: ['product_id'];
            referencedRelation: 'products';
            referencedColumns: ['product_id'];
          },
          {
            foreignKeyName: 'product_accessories_product_id2_fkey';
            columns: ['product_id2'];
            referencedRelation: 'products';
            referencedColumns: ['product_id'];
          }
        ];
      };
      product_collections: {
        Row: {
          collection_id: number;
          created_at: string;
          product_id: number;
          updated_at: string;
        };
        Insert: {
          collection_id: number;
          created_at?: string;
          product_id: number;
          updated_at?: string;
        };
        Update: {
          collection_id?: number;
          created_at?: string;
          product_id?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'product_collections_collection_id_fkey';
            columns: ['collection_id'];
            referencedRelation: 'collections';
            referencedColumns: ['collection_id'];
          },
          {
            foreignKeyName: 'product_collections_product_id_fkey';
            columns: ['product_id'];
            referencedRelation: 'products';
            referencedColumns: ['product_id'];
          }
        ];
      };
      product_images: {
        Row: {
          alt: string | null;
          created_at: string;
          height: number | null;
          position: number;
          product_id: number;
          product_image_id: number;
          shopify_image_id: number | null;
          updated_at: string;
          url: string;
          width: number | null;
        };
        Insert: {
          alt?: string | null;
          created_at?: string;
          height?: number | null;
          position: number;
          product_id: number;
          product_image_id?: never;
          shopify_image_id?: number | null;
          updated_at?: string;
          url: string;
          width?: number | null;
        };
        Update: {
          alt?: string | null;
          created_at?: string;
          height?: number | null;
          position?: number;
          product_id?: number;
          product_image_id?: never;
          shopify_image_id?: number | null;
          updated_at?: string;
          url?: string;
          width?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'product_images_product_id_fkey';
            columns: ['product_id'];
            referencedRelation: 'products';
            referencedColumns: ['product_id'];
          }
        ];
      };
      product_options: {
        Row: {
          created_at: string;
          description: string;
          product_option_id: number;
          updated_at: string;
          value: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          product_option_id?: number;
          updated_at?: string;
          value: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          product_option_id?: number;
          updated_at?: string;
          value?: string;
        };
        Relationships: [];
      };
      product_status: {
        Row: {
          description: string;
          product_status_id: number;
        };
        Insert: {
          description: string;
          product_status_id?: number;
        };
        Update: {
          description?: string;
          product_status_id?: number;
        };
        Relationships: [];
      };
      product_translations: {
        Row: {
          created_at: string;
          description: string | null;
          meta_description: string | null;
          meta_title: string | null;
          product_id: number;
          product_translation_id: number;
          title: string | null;
          translation_language: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          meta_description?: string | null;
          meta_title?: string | null;
          product_id: number;
          product_translation_id?: number;
          title?: string | null;
          translation_language: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          meta_description?: string | null;
          meta_title?: string | null;
          product_id?: number;
          product_translation_id?: number;
          title?: string | null;
          translation_language?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'product_translations_product_id_fkey';
            columns: ['product_id'];
            referencedRelation: 'products';
            referencedColumns: ['product_id'];
          }
        ];
      };
      product_types: {
        Row: {
          created_at: string;
          description: string;
          product_type_id: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          product_type_id?: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          product_type_id?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          created_at: string;
          default_description: string | null;
          default_description_html: string | null;
          default_image_alt: string | null;
          default_image_url: string | null;
          default_meta_description: string | null;
          default_meta_title: string | null;
          handle: string;
          is_featured: boolean | null;
          metafield_30x21: string | null;
          metafield_40x30: string | null;
          metafield_50x40: string | null;
          metafield_70x50: string | null;
          metafield_90x60: string | null;
          metafield_artist: string | null;
          metafield_artist_wikidata: string | null;
          metafield_artwork_wikidata: string | null;
          metafield_description_tag: string | null;
          metafield_orientation: string | null;
          metafield_primary_color: string | null;
          metafield_secondary_color: string | null;
          metafield_title_tag: string | null;
          metafield_type: string | null;
          product_id: number;
          product_status_id: number;
          product_type_id: number;
          published_at: string | null;
          shopify_product_id: number | null;
          tags: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          default_description?: string | null;
          default_description_html?: string | null;
          default_image_alt?: string | null;
          default_image_url?: string | null;
          default_meta_description?: string | null;
          default_meta_title?: string | null;
          handle: string;
          is_featured?: boolean | null;
          metafield_30x21?: string | null;
          metafield_40x30?: string | null;
          metafield_50x40?: string | null;
          metafield_70x50?: string | null;
          metafield_90x60?: string | null;
          metafield_artist?: string | null;
          metafield_artist_wikidata?: string | null;
          metafield_artwork_wikidata?: string | null;
          metafield_description_tag?: string | null;
          metafield_orientation?: string | null;
          metafield_primary_color?: string | null;
          metafield_secondary_color?: string | null;
          metafield_title_tag?: string | null;
          metafield_type?: string | null;
          product_id?: number;
          product_status_id: number;
          product_type_id: number;
          published_at?: string | null;
          shopify_product_id?: number | null;
          tags?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          default_description?: string | null;
          default_description_html?: string | null;
          default_image_alt?: string | null;
          default_image_url?: string | null;
          default_meta_description?: string | null;
          default_meta_title?: string | null;
          handle?: string;
          is_featured?: boolean | null;
          metafield_30x21?: string | null;
          metafield_40x30?: string | null;
          metafield_50x40?: string | null;
          metafield_70x50?: string | null;
          metafield_90x60?: string | null;
          metafield_artist?: string | null;
          metafield_artist_wikidata?: string | null;
          metafield_artwork_wikidata?: string | null;
          metafield_description_tag?: string | null;
          metafield_orientation?: string | null;
          metafield_primary_color?: string | null;
          metafield_secondary_color?: string | null;
          metafield_title_tag?: string | null;
          metafield_type?: string | null;
          product_id?: number;
          product_status_id?: number;
          product_type_id?: number;
          published_at?: string | null;
          shopify_product_id?: number | null;
          tags?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'products_product_status_id_fkey';
            columns: ['product_status_id'];
            referencedRelation: 'product_status';
            referencedColumns: ['product_status_id'];
          },
          {
            foreignKeyName: 'products_product_type_id_fkey';
            columns: ['product_type_id'];
            referencedRelation: 'product_types';
            referencedColumns: ['product_type_id'];
          }
        ];
      };
      related_products: {
        Row: {
          product_id: number;
          product_id2: number;
          related_product_id: number;
        };
        Insert: {
          product_id: number;
          product_id2: number;
          related_product_id?: never;
        };
        Update: {
          product_id?: number;
          product_id2?: number;
          related_product_id?: never;
        };
        Relationships: [
          {
            foreignKeyName: 'related_products_product_id_fkey';
            columns: ['product_id'];
            referencedRelation: 'products';
            referencedColumns: ['product_id'];
          },
          {
            foreignKeyName: 'related_products_product_id2_fkey';
            columns: ['product_id2'];
            referencedRelation: 'products';
            referencedColumns: ['product_id'];
          }
        ];
      };
      roles: {
        Row: {
          created_at: string;
          description: string;
          role_id: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          role_id?: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          role_id?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      shopify_orders: {
        Row: {
          browser_ip: string | null;
          contact_email: string | null;
          currency: string | null;
          is_discounted: boolean | null;
          ordered_at: string | null;
          shopify_order_id: number;
          shopify_user_id: number | null;
          total_price: number | null;
        };
        Insert: {
          browser_ip?: string | null;
          contact_email?: string | null;
          currency?: string | null;
          is_discounted?: boolean | null;
          ordered_at?: string | null;
          shopify_order_id: number;
          shopify_user_id?: number | null;
          total_price?: number | null;
        };
        Update: {
          browser_ip?: string | null;
          contact_email?: string | null;
          currency?: string | null;
          is_discounted?: boolean | null;
          ordered_at?: string | null;
          shopify_order_id?: number;
          shopify_user_id?: number | null;
          total_price?: number | null;
        };
        Relationships: [];
      };
      shopify_users: {
        Row: {
          accepts_marketing: boolean | null;
          city: string | null;
          country_name: string | null;
          created_at: string | null;
          email: string | null;
          first_name: string | null;
          last_name: string | null;
          phone_number: string | null;
          province: string | null;
          shopify_address_id: number | null;
          shopify_user_id: number;
          sms_marketing_consent: boolean | null;
          street: string | null;
          updated_at: string | null;
          user_active_state: string | null;
          zip: string | null;
        };
        Insert: {
          accepts_marketing?: boolean | null;
          city?: string | null;
          country_name?: string | null;
          created_at?: string | null;
          email?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          phone_number?: string | null;
          province?: string | null;
          shopify_address_id?: number | null;
          shopify_user_id: number;
          sms_marketing_consent?: boolean | null;
          street?: string | null;
          updated_at?: string | null;
          user_active_state?: string | null;
          zip?: string | null;
        };
        Update: {
          accepts_marketing?: boolean | null;
          city?: string | null;
          country_name?: string | null;
          created_at?: string | null;
          email?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          phone_number?: string | null;
          province?: string | null;
          shopify_address_id?: number | null;
          shopify_user_id?: number;
          sms_marketing_consent?: boolean | null;
          street?: string | null;
          updated_at?: string | null;
          user_active_state?: string | null;
          zip?: string | null;
        };
        Relationships: [];
      };
      user_images: {
        Row: {
          created: string;
          description: string | null;
          id: number;
          image_url: string;
          title: string | null;
          user_id: string;
        };
        Insert: {
          created?: string;
          description?: string | null;
          id?: number;
          image_url: string;
          title?: string | null;
          user_id: string;
        };
        Update: {
          created?: string;
          description?: string | null;
          id?: number;
          image_url?: string;
          title?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          auth_user_id: string;
          created_at: string;
          description: string;
          role_id: number;
          updated_at: string;
          user_role_id: number;
        };
        Insert: {
          auth_user_id: string;
          created_at?: string;
          description: string;
          role_id: number;
          updated_at?: string;
          user_role_id?: number;
        };
        Update: {
          auth_user_id?: string;
          created_at?: string;
          description?: string;
          role_id?: number;
          updated_at?: string;
          user_role_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'user_roles_auth_user_id_fkey';
            columns: ['auth_user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_roles_role_id_fkey';
            columns: ['role_id'];
            referencedRelation: 'roles';
            referencedColumns: ['role_id'];
          }
        ];
      };
      users: {
        Row: {
          accepts_marketing: boolean | null;
          accepts_marketing_updated_at: string | null;
          created_at: string;
          email: string | null;
          first_name: string | null;
          is_registered: boolean;
          last_name: string | null;
          phone_number: string | null;
          sms_marketing_consent: boolean | null;
          uid: string;
          updated_at: string;
          user_active_state: string | null;
        };
        Insert: {
          accepts_marketing?: boolean | null;
          accepts_marketing_updated_at?: string | null;
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          is_registered?: boolean;
          last_name?: string | null;
          phone_number?: string | null;
          sms_marketing_consent?: boolean | null;
          uid: string;
          updated_at?: string;
          user_active_state?: string | null;
        };
        Update: {
          accepts_marketing?: boolean | null;
          accepts_marketing_updated_at?: string | null;
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          is_registered?: boolean;
          last_name?: string | null;
          phone_number?: string | null;
          sms_marketing_consent?: boolean | null;
          uid?: string;
          updated_at?: string;
          user_active_state?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'users_uid_fkey';
            columns: ['uid'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      change_user_password: {
        Args: {
          current_plain_password: string;
          new_plain_password: string;
        };
        Returns: Json;
      };
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      is_super_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      upsertCartItems: {
        Args: {
          items: Json;
        };
        Returns: undefined;
      };
      user_active_cart_id: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      user_uid: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      continents:
        | 'Africa'
        | 'Antarctica'
        | 'Asia'
        | 'Europe'
        | 'Oceania'
        | 'North America'
        | 'South America';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
