// Generated from the Supabase schema (supabase gen types). Regenerate after
// schema changes via the Supabase MCP `generate_typescript_types` tool.
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      achievements: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          is_published: boolean;
          sort_order: number;
          title: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          is_published?: boolean;
          sort_order?: number;
          title: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          is_published?: boolean;
          sort_order?: number;
          title?: string;
        };
        Relationships: [];
      };
      admins: {
        Row: { created_at: string; email: string | null; user_id: string };
        Insert: { created_at?: string; email?: string | null; user_id: string };
        Update: { created_at?: string; email?: string | null; user_id?: string };
        Relationships: [];
      };
      company_values: {
        Row: {
          created_at: string;
          description: string | null;
          icon: string | null;
          id: string;
          is_published: boolean;
          sort_order: number;
          title: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          icon?: string | null;
          id?: string;
          is_published?: boolean;
          sort_order?: number;
          title: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          icon?: string | null;
          id?: string;
          is_published?: boolean;
          sort_order?: number;
          title?: string;
        };
        Relationships: [];
      };
      contact_cards: {
        Row: {
          created_at: string;
          href: string | null;
          icon: string | null;
          id: string;
          is_published: boolean;
          kind: string;
          label: string | null;
          links: Json;
          sort_order: number;
        };
        Insert: {
          created_at?: string;
          href?: string | null;
          icon?: string | null;
          id?: string;
          is_published?: boolean;
          kind?: string;
          label?: string | null;
          links?: Json;
          sort_order?: number;
        };
        Update: {
          created_at?: string;
          href?: string | null;
          icon?: string | null;
          id?: string;
          is_published?: boolean;
          kind?: string;
          label?: string | null;
          links?: Json;
          sort_order?: number;
        };
        Relationships: [];
      };
      contact_inquiries: {
        Row: {
          agreed_to_terms: boolean;
          created_at: string;
          email: string | null;
          first_name: string | null;
          how_did_you_hear: string | null;
          id: string;
          inquiry_type: string | null;
          last_name: string | null;
          message: string | null;
          phone: string | null;
          status: string;
        };
        Insert: {
          agreed_to_terms?: boolean;
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          how_did_you_hear?: string | null;
          id?: string;
          inquiry_type?: string | null;
          last_name?: string | null;
          message?: string | null;
          phone?: string | null;
          status?: string;
        };
        Update: {
          agreed_to_terms?: boolean;
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          how_did_you_hear?: string | null;
          id?: string;
          inquiry_type?: string | null;
          last_name?: string | null;
          message?: string | null;
          phone?: string | null;
          status?: string;
        };
        Relationships: [];
      };
      experience_steps: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          is_published: boolean;
          sort_order: number;
          title: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          is_published?: boolean;
          sort_order?: number;
          title: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          is_published?: boolean;
          sort_order?: number;
          title?: string;
        };
        Relationships: [];
      };
      faq_items: {
        Row: {
          answer: string | null;
          created_at: string;
          id: string;
          is_published: boolean;
          question: string;
          read_more_url: string | null;
          sort_order: number;
        };
        Insert: {
          answer?: string | null;
          created_at?: string;
          id?: string;
          is_published?: boolean;
          question: string;
          read_more_url?: string | null;
          sort_order?: number;
        };
        Update: {
          answer?: string | null;
          created_at?: string;
          id?: string;
          is_published?: boolean;
          question?: string;
          read_more_url?: string | null;
          sort_order?: number;
        };
        Relationships: [];
      };
      filter_options: {
        Row: {
          created_at: string;
          facet: string;
          id: string;
          is_published: boolean;
          label: string;
          sort_order: number;
          value: string;
        };
        Insert: {
          created_at?: string;
          facet: string;
          id?: string;
          is_published?: boolean;
          label: string;
          sort_order?: number;
          value: string;
        };
        Update: {
          created_at?: string;
          facet?: string;
          id?: string;
          is_published?: boolean;
          label?: string;
          sort_order?: number;
          value?: string;
        };
        Relationships: [];
      };
      footer_columns: {
        Row: {
          created_at: string;
          heading: string;
          id: string;
          is_published: boolean;
          sort_order: number;
        };
        Insert: {
          created_at?: string;
          heading: string;
          id?: string;
          is_published?: boolean;
          sort_order?: number;
        };
        Update: {
          created_at?: string;
          heading?: string;
          id?: string;
          is_published?: boolean;
          sort_order?: number;
        };
        Relationships: [];
      };
      footer_links: {
        Row: {
          column_id: string | null;
          created_at: string;
          href: string | null;
          id: string;
          is_published: boolean;
          label: string;
          sort_order: number;
        };
        Insert: {
          column_id?: string | null;
          created_at?: string;
          href?: string | null;
          id?: string;
          is_published?: boolean;
          label: string;
          sort_order?: number;
        };
        Update: {
          column_id?: string | null;
          created_at?: string;
          href?: string | null;
          id?: string;
          is_published?: boolean;
          label?: string;
          sort_order?: number;
        };
        Relationships: [];
      };
      gallery_photos: {
        Row: {
          alt: string | null;
          aspect_ratio: string | null;
          created_at: string;
          id: string;
          is_published: boolean;
          sizes: string | null;
          sort_order: number;
          src: string;
        };
        Insert: {
          alt?: string | null;
          aspect_ratio?: string | null;
          created_at?: string;
          id?: string;
          is_published?: boolean;
          sizes?: string | null;
          sort_order?: number;
          src: string;
        };
        Update: {
          alt?: string | null;
          aspect_ratio?: string | null;
          created_at?: string;
          id?: string;
          is_published?: boolean;
          sizes?: string | null;
          sort_order?: number;
          src?: string;
        };
        Relationships: [];
      };
      general_inquiries: {
        Row: {
          agree_to_terms: boolean;
          bathrooms: string | null;
          bedrooms: string | null;
          budget: string | null;
          contact_email: string | null;
          contact_number: string | null;
          created_at: string;
          email: string | null;
          first_name: string | null;
          id: string;
          last_name: string | null;
          message: string | null;
          phone: string | null;
          preferred_contact_method: string | null;
          preferred_location: string | null;
          property_type: string | null;
          status: string;
        };
        Insert: {
          agree_to_terms?: boolean;
          bathrooms?: string | null;
          bedrooms?: string | null;
          budget?: string | null;
          contact_email?: string | null;
          contact_number?: string | null;
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          message?: string | null;
          phone?: string | null;
          preferred_contact_method?: string | null;
          preferred_location?: string | null;
          property_type?: string | null;
          status?: string;
        };
        Update: {
          agree_to_terms?: boolean;
          bathrooms?: string | null;
          bedrooms?: string | null;
          budget?: string | null;
          contact_email?: string | null;
          contact_number?: string | null;
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          message?: string | null;
          phone?: string | null;
          preferred_contact_method?: string | null;
          preferred_location?: string | null;
          property_type?: string | null;
          status?: string;
        };
        Relationships: [];
      };
      icon_feature_cards: {
        Row: {
          created_at: string;
          icon: string | null;
          id: string;
          is_published: boolean;
          link_url: string | null;
          location: string;
          sort_order: number;
          title: string;
        };
        Insert: {
          created_at?: string;
          icon?: string | null;
          id?: string;
          is_published?: boolean;
          link_url?: string | null;
          location?: string;
          sort_order?: number;
          title: string;
        };
        Update: {
          created_at?: string;
          icon?: string | null;
          id?: string;
          is_published?: boolean;
          link_url?: string | null;
          location?: string;
          sort_order?: number;
          title?: string;
        };
        Relationships: [];
      };
      newsletter_subscribers: {
        Row: { created_at: string; email: string; id: string };
        Insert: { created_at?: string; email: string; id?: string };
        Update: { created_at?: string; email?: string; id?: string };
        Relationships: [];
      };
      office_locations: {
        Row: {
          button_href: string | null;
          button_label: string | null;
          city: string | null;
          created_at: string;
          description: string | null;
          email: string | null;
          id: string;
          is_published: boolean;
          label: string | null;
          phone: string | null;
          region: string;
          sort_order: number;
          title: string | null;
        };
        Insert: {
          button_href?: string | null;
          button_label?: string | null;
          city?: string | null;
          created_at?: string;
          description?: string | null;
          email?: string | null;
          id?: string;
          is_published?: boolean;
          label?: string | null;
          phone?: string | null;
          region?: string;
          sort_order?: number;
          title?: string | null;
        };
        Update: {
          button_href?: string | null;
          button_label?: string | null;
          city?: string | null;
          created_at?: string;
          description?: string | null;
          email?: string | null;
          id?: string;
          is_published?: boolean;
          label?: string | null;
          phone?: string | null;
          region?: string;
          sort_order?: number;
          title?: string | null;
        };
        Relationships: [];
      };
      pricing_categories: {
        Row: {
          created_at: string;
          id: string;
          items: Json;
          learn_more_url: string | null;
          property_id: string;
          sort_order: number;
          title: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          items?: Json;
          learn_more_url?: string | null;
          property_id: string;
          sort_order?: number;
          title: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          items?: Json;
          learn_more_url?: string | null;
          property_id?: string;
          sort_order?: number;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "pricing_categories_property_id_fkey";
            columns: ["property_id"];
            isOneToOne: false;
            referencedRelation: "properties";
            referencedColumns: ["id"];
          },
        ];
      };
      properties: {
        Row: {
          area: number | null;
          area_unit: string;
          bathrooms: number | null;
          bedrooms: number | null;
          card_description: string | null;
          card_image: string | null;
          created_at: string;
          currency: string;
          full_description: string | null;
          id: string;
          is_published: boolean;
          key_features: Json;
          location: string | null;
          meta_description: string | null;
          meta_title: string | null;
          price: number | null;
          property_type: string | null;
          slug: string;
          sort_order: number;
          tagline: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          area?: number | null;
          area_unit?: string;
          bathrooms?: number | null;
          bedrooms?: number | null;
          card_description?: string | null;
          card_image?: string | null;
          created_at?: string;
          currency?: string;
          full_description?: string | null;
          id?: string;
          is_published?: boolean;
          key_features?: Json;
          location?: string | null;
          meta_description?: string | null;
          meta_title?: string | null;
          price?: number | null;
          property_type?: string | null;
          slug: string;
          sort_order?: number;
          tagline?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          area?: number | null;
          area_unit?: string;
          bathrooms?: number | null;
          bedrooms?: number | null;
          card_description?: string | null;
          card_image?: string | null;
          created_at?: string;
          currency?: string;
          full_description?: string | null;
          id?: string;
          is_published?: boolean;
          key_features?: Json;
          location?: string | null;
          meta_description?: string | null;
          meta_title?: string | null;
          price?: number | null;
          property_type?: string | null;
          slug?: string;
          sort_order?: number;
          tagline?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      property_gallery_images: {
        Row: {
          alt: string | null;
          created_at: string;
          id: string;
          property_id: string;
          sort_order: number;
          src: string;
        };
        Insert: {
          alt?: string | null;
          created_at?: string;
          id?: string;
          property_id: string;
          sort_order?: number;
          src: string;
        };
        Update: {
          alt?: string | null;
          created_at?: string;
          id?: string;
          property_id?: string;
          sort_order?: number;
          src?: string;
        };
        Relationships: [
          {
            foreignKeyName: "property_gallery_images_property_id_fkey";
            columns: ["property_id"];
            isOneToOne: false;
            referencedRelation: "properties";
            referencedColumns: ["id"];
          },
        ];
      };
      property_inquiries: {
        Row: {
          agreed_to_terms: boolean;
          created_at: string;
          email: string | null;
          first_name: string | null;
          id: string;
          last_name: string | null;
          message: string | null;
          phone: string | null;
          property_id: string | null;
          status: string;
        };
        Insert: {
          agreed_to_terms?: boolean;
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          message?: string | null;
          phone?: string | null;
          property_id?: string | null;
          status?: string;
        };
        Update: {
          agreed_to_terms?: boolean;
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          message?: string | null;
          phone?: string | null;
          property_id?: string | null;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "property_inquiries_property_id_fkey";
            columns: ["property_id"];
            isOneToOne: false;
            referencedRelation: "properties";
            referencedColumns: ["id"];
          },
        ];
      };
      service_cards: {
        Row: {
          created_at: string;
          description: string | null;
          icon: string | null;
          id: string;
          is_published: boolean;
          parent_id: string | null;
          parent_type: string;
          sort_order: number;
          title: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          icon?: string | null;
          id?: string;
          is_published?: boolean;
          parent_id?: string | null;
          parent_type?: string;
          sort_order?: number;
          title: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          icon?: string | null;
          id?: string;
          is_published?: boolean;
          parent_id?: string | null;
          parent_type?: string;
          sort_order?: number;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "service_cards_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "service_categories";
            referencedColumns: ["id"];
          },
        ];
      };
      service_categories: {
        Row: {
          created_at: string;
          featured_button_href: string | null;
          featured_button_label: string | null;
          featured_heading: string | null;
          featured_paragraph: string | null;
          heading: string;
          id: string;
          is_published: boolean;
          paragraph: string | null;
          sort_order: number;
        };
        Insert: {
          created_at?: string;
          featured_button_href?: string | null;
          featured_button_label?: string | null;
          featured_heading?: string | null;
          featured_paragraph?: string | null;
          heading: string;
          id?: string;
          is_published?: boolean;
          paragraph?: string | null;
          sort_order?: number;
        };
        Update: {
          created_at?: string;
          featured_button_href?: string | null;
          featured_button_label?: string | null;
          featured_heading?: string | null;
          featured_paragraph?: string | null;
          heading?: string;
          id?: string;
          is_published?: boolean;
          paragraph?: string | null;
          sort_order?: number;
        };
        Relationships: [];
      };
      site_content: {
        Row: { key: string; updated_at: string; value: Json };
        Insert: { key: string; updated_at?: string; value?: Json };
        Update: { key?: string; updated_at?: string; value?: Json };
        Relationships: [];
      };
      social_links: {
        Row: {
          created_at: string;
          id: string;
          is_published: boolean;
          platform: string;
          sort_order: number;
          svg_path: string | null;
          url: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_published?: boolean;
          platform: string;
          sort_order?: number;
          svg_path?: string | null;
          url?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_published?: boolean;
          platform?: string;
          sort_order?: number;
          svg_path?: string | null;
          url?: string | null;
        };
        Relationships: [];
      };
      team_members: {
        Row: {
          contact_url: string | null;
          created_at: string;
          id: string;
          image: string | null;
          is_published: boolean;
          name: string;
          role: string | null;
          sort_order: number;
          twitter_url: string | null;
        };
        Insert: {
          contact_url?: string | null;
          created_at?: string;
          id?: string;
          image?: string | null;
          is_published?: boolean;
          name: string;
          role?: string | null;
          sort_order?: number;
          twitter_url?: string | null;
        };
        Update: {
          contact_url?: string | null;
          created_at?: string;
          id?: string;
          image?: string | null;
          is_published?: boolean;
          name?: string;
          role?: string | null;
          sort_order?: number;
          twitter_url?: string | null;
        };
        Relationships: [];
      };
      testimonials: {
        Row: {
          author_location: string | null;
          author_name: string | null;
          avatar: string | null;
          body: string | null;
          created_at: string;
          id: string;
          is_published: boolean;
          rating: number;
          sort_order: number;
          title: string | null;
        };
        Insert: {
          author_location?: string | null;
          author_name?: string | null;
          avatar?: string | null;
          body?: string | null;
          created_at?: string;
          id?: string;
          is_published?: boolean;
          rating?: number;
          sort_order?: number;
          title?: string | null;
        };
        Update: {
          author_location?: string | null;
          author_name?: string | null;
          avatar?: string | null;
          body?: string | null;
          created_at?: string;
          id?: string;
          is_published?: boolean;
          rating?: number;
          sort_order?: number;
          title?: string | null;
        };
        Relationships: [];
      };
      valued_clients: {
        Row: {
          category: string | null;
          company: string;
          created_at: string;
          domain: string | null;
          id: string;
          is_published: boolean;
          quote: string | null;
          since: number | null;
          sort_order: number;
          website_url: string | null;
        };
        Insert: {
          category?: string | null;
          company: string;
          created_at?: string;
          domain?: string | null;
          id?: string;
          is_published?: boolean;
          quote?: string | null;
          since?: number | null;
          sort_order?: number;
          website_url?: string | null;
        };
        Update: {
          category?: string | null;
          company?: string;
          created_at?: string;
          domain?: string | null;
          id?: string;
          is_published?: boolean;
          quote?: string | null;
          since?: number | null;
          sort_order?: number;
          website_url?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
