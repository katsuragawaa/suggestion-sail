
import { useState } from "react";
import { getKanbanData } from "@/lib/data";
import { SuggestionCard } from "@/components/SuggestionCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export function Kanban() {
  const [searchQuery, setSearchQuery] = useState("");
  const kanbanData = getKanbanData();
  
  // Filter suggestions based on search query
  const filteredData = {
    discovery: kanbanData.discovery.filter(s => 
      !searchQuery || 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    development: kanbanData.development.filter(s => 
      !searchQuery || 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    shipped: kanbanData.shipped.filter(s => 
      !searchQuery || 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  };
  
  const columnVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">Kanban Board</h1>
        <p className="text-muted-foreground">
          Track the status of suggestions through the development pipeline.
        </p>
      </div>
      
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search suggestions..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6 overflow-auto pb-4">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={columnVariants}
          className="kanban-column"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <h3 className="font-medium">Discovery</h3>
            </div>
            <span className="text-sm font-medium px-2 py-1 bg-secondary rounded-full">
              {filteredData.discovery.length}
            </span>
          </div>
          
          <div className="space-y-3">
            {filteredData.discovery.map((suggestion) => (
              <SuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
            
            {filteredData.discovery.length === 0 && (
              <div className="p-4 bg-secondary/50 rounded-lg text-center text-muted-foreground">
                No suggestions in discovery
              </div>
            )}
          </div>
        </motion.div>
        
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={columnVariants}
          className="kanban-column"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <h3 className="font-medium">Development</h3>
            </div>
            <span className="text-sm font-medium px-2 py-1 bg-secondary rounded-full">
              {filteredData.development.length}
            </span>
          </div>
          
          <div className="space-y-3">
            {filteredData.development.map((suggestion) => (
              <SuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
            
            {filteredData.development.length === 0 && (
              <div className="p-4 bg-secondary/50 rounded-lg text-center text-muted-foreground">
                No suggestions in development
              </div>
            )}
          </div>
        </motion.div>
        
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={columnVariants}
          className="kanban-column"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <h3 className="font-medium">Shipped</h3>
            </div>
            <span className="text-sm font-medium px-2 py-1 bg-secondary rounded-full">
              {filteredData.shipped.length}
            </span>
          </div>
          
          <div className="space-y-3">
            {filteredData.shipped.map((suggestion) => (
              <SuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
            
            {filteredData.shipped.length === 0 && (
              <div className="p-4 bg-secondary/50 rounded-lg text-center text-muted-foreground">
                No suggestions shipped
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Kanban;
