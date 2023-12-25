import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"

export default function Component() {
  return (
    <div className="w-full">
      <Tabs className="w-full" defaultValue="terminal1">
        <TabsList className="grid w-full grid-cols-6 gap-2">
          <TabsTrigger value="terminal1">Terminal 1</TabsTrigger>
          <TabsTrigger value="terminal2">Terminal 2</TabsTrigger>
          <TabsTrigger value="terminal3">Terminal 3</TabsTrigger>
          <div className="flex justify-center items-center border border-gray-200 hover:border-gray-500 cursor-pointer">
            +
          </div>
        </TabsList>
        <TabsContent value="terminal1">
          <Card className="bg-[#000000] text-[#ffffff]">
            <CardHeader>
              <CardTitle>Terminal 1</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>User@localhost:~$</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="terminal2">
          <Card className="bg-[#000000] text-[#ffffff]">
            <CardHeader>
              <CardTitle>Terminal 2</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>User@localhost:~$</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="terminal3">
          <Card className="bg-[#000000] text-[#ffffff]">
            <CardHeader>
              <CardTitle>Terminal 3</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>User@localhost:~$</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
