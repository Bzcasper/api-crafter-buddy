import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const usePropertyListings = () => {
  return useQuery({
    queryKey: ['property_listings'],
    queryFn: async () => {
      const { data: properties, error } = await supabase
        .from('property_listings')
        .select('*')
        .eq('status', 'active');

      if (error) throw error;
      return properties;
    }
  });
};