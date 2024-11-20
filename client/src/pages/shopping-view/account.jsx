import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";

function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          className="object-cover object-center w-full h-full"
        />
      </div>
      <div className="container grid grid-cols-1 gap-8 py-8 mx-auto">
        <div className="flex flex-col p-6 border rounded-lg shadow-sm bg-background">
          <Tabs defaultValue="address">
            <TabsList>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>  
            <div className="p-20">        
            <TabsContent value="address">
            <Address />
            </TabsContent></div> 
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
