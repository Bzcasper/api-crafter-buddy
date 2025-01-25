export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      companies: {
        Row: {
          created_at: string
          created_by: string
          id: string
          industry: string | null
          name: string
          updated_at: string
          website: string | null
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          industry?: string | null
          name: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          industry?: string | null
          name?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          company_id: string | null
          created_at: string
          created_by: string
          email: string | null
          first_name: string
          id: string
          last_name: string
          phone: string | null
          position: string | null
          updated_at: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          created_by: string
          email?: string | null
          first_name: string
          id?: string
          last_name: string
          phone?: string | null
          position?: string | null
          updated_at?: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          created_by?: string
          email?: string | null
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          position?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contacts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      deals: {
        Row: {
          close_date: string | null
          company_id: string
          created_at: string
          created_by: string
          id: string
          status: string
          title: string
          updated_at: string
          value: number | null
        }
        Insert: {
          close_date?: string | null
          company_id: string
          created_at?: string
          created_by: string
          id?: string
          status?: string
          title: string
          updated_at?: string
          value?: number | null
        }
        Update: {
          close_date?: string | null
          company_id?: string
          created_at?: string
          created_by?: string
          id?: string
          status?: string
          title?: string
          updated_at?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "deals_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      image_metadata: {
        Row: {
          compression_quality: number | null
          created_at: string
          filename: string
          height: number | null
          id: string
          metadata: Json | null
          mime_type: string | null
          note_id: string | null
          original_url: string | null
          size_bytes: number | null
          storage_path: string
          width: number | null
        }
        Insert: {
          compression_quality?: number | null
          created_at?: string
          filename: string
          height?: number | null
          id?: string
          metadata?: Json | null
          mime_type?: string | null
          note_id?: string | null
          original_url?: string | null
          size_bytes?: number | null
          storage_path: string
          width?: number | null
        }
        Update: {
          compression_quality?: number | null
          created_at?: string
          filename?: string
          height?: number | null
          id?: string
          metadata?: Json | null
          mime_type?: string | null
          note_id?: string | null
          original_url?: string | null
          size_bytes?: number | null
          storage_path?: string
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_note"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "image_metadata_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
        ]
      }
      notes: {
        Row: {
          ai_processed_content: string | null
          content: string
          created_at: string
          error_message: string | null
          id: string
          obsidian_path: string | null
          source_url: string | null
          status: string | null
          tags: string[] | null
          template_used: string | null
          title: string
          topic_classification: string | null
          updated_at: string
        }
        Insert: {
          ai_processed_content?: string | null
          content: string
          created_at?: string
          error_message?: string | null
          id?: string
          obsidian_path?: string | null
          source_url?: string | null
          status?: string | null
          tags?: string[] | null
          template_used?: string | null
          title: string
          topic_classification?: string | null
          updated_at?: string
        }
        Update: {
          ai_processed_content?: string | null
          content?: string
          created_at?: string
          error_message?: string | null
          id?: string
          obsidian_path?: string | null
          source_url?: string | null
          status?: string | null
          tags?: string[] | null
          template_used?: string | null
          title?: string
          topic_classification?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          agent_license_number: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          is_agent: boolean | null
          obsidian_path: string | null
          phone_number: string | null
          updated_at: string
        }
        Insert: {
          agent_license_number?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          is_agent?: boolean | null
          obsidian_path?: string | null
          phone_number?: string | null
          updated_at?: string
        }
        Update: {
          agent_license_number?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          is_agent?: boolean | null
          obsidian_path?: string | null
          phone_number?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      property_listings: {
        Row: {
          address: string
          auction_date: string | null
          created_at: string
          created_by: string
          description: string | null
          id: string
          image_url: string | null
          latitude: number
          longitude: number
          price: number
          status: string
          title: string
          type: Database["public"]["Enums"]["property_type"]
        }
        Insert: {
          address: string
          auction_date?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          image_url?: string | null
          latitude: number
          longitude: number
          price: number
          status?: string
          title: string
          type: Database["public"]["Enums"]["property_type"]
        }
        Update: {
          address?: string
          auction_date?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          image_url?: string | null
          latitude?: number
          longitude?: number
          price?: number
          status?: string
          title?: string
          type?: Database["public"]["Enums"]["property_type"]
        }
        Relationships: []
      }
      scraping_templates: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          template_content: string
          topic_category: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          template_content: string
          topic_category: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          template_content?: string
          topic_category?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
      website_analytics: {
        Row: {
          avg_session_duration: unknown | null
          bounce_rate: number | null
          created_at: string
          date: string
          id: string
          page_views: number | null
          unique_visitors: number | null
          website_id: string
        }
        Insert: {
          avg_session_duration?: unknown | null
          bounce_rate?: number | null
          created_at?: string
          date?: string
          id?: string
          page_views?: number | null
          unique_visitors?: number | null
          website_id: string
        }
        Update: {
          avg_session_duration?: unknown | null
          bounce_rate?: number | null
          created_at?: string
          date?: string
          id?: string
          page_views?: number | null
          unique_visitors?: number | null
          website_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "website_analytics_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "websites"
            referencedColumns: ["id"]
          },
        ]
      }
      website_assets: {
        Row: {
          created_at: string
          filename: string
          folder_path: string | null
          id: string
          mime_type: string | null
          size_bytes: number | null
          storage_path: string
          website_id: string
        }
        Insert: {
          created_at?: string
          filename: string
          folder_path?: string | null
          id?: string
          mime_type?: string | null
          size_bytes?: number | null
          storage_path: string
          website_id: string
        }
        Update: {
          created_at?: string
          filename?: string
          folder_path?: string | null
          id?: string
          mime_type?: string | null
          size_bytes?: number | null
          storage_path?: string
          website_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "website_assets_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "websites"
            referencedColumns: ["id"]
          },
        ]
      }
      website_pages: {
        Row: {
          content: string | null
          created_at: string
          id: string
          is_published: boolean | null
          meta_description: string | null
          slug: string
          title: string
          updated_at: string
          website_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          slug: string
          title: string
          updated_at?: string
          website_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          slug?: string
          title?: string
          updated_at?: string
          website_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "website_pages_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "websites"
            referencedColumns: ["id"]
          },
        ]
      }
      websites: {
        Row: {
          analytics_id: string | null
          created_at: string
          created_by: string
          domain: string | null
          favicon_url: string | null
          id: string
          last_published_at: string | null
          settings: Json | null
          status: string | null
          template: string
          theme_settings: Json | null
          title: string
          updated_at: string
        }
        Insert: {
          analytics_id?: string | null
          created_at?: string
          created_by: string
          domain?: string | null
          favicon_url?: string | null
          id?: string
          last_published_at?: string | null
          settings?: Json | null
          status?: string | null
          template: string
          theme_settings?: Json | null
          title: string
          updated_at?: string
        }
        Update: {
          analytics_id?: string | null
          created_at?: string
          created_by?: string
          domain?: string | null
          favicon_url?: string | null
          id?: string
          last_published_at?: string | null
          settings?: Json | null
          status?: string | null
          template?: string
          theme_settings?: Json | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      property_type: "tax_lien" | "new_listing"
      user_role: "admin" | "manager" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
