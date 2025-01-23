import { supabase } from "@/integrations/supabase/client";

export const invokeModalFunction = async (functionName: string, payload: any) => {
  try {
    console.log(`Invoking Modal function: ${functionName}`);
    const { data, error } = await supabase.functions.invoke(functionName, {
      body: payload
    });
    
    if (error) {
      console.error('Error invoking Modal function:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error in modalService:', error);
    throw error;
  }
};