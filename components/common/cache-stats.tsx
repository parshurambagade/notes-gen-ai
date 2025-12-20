"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useRecentlyGeneratedNotesStore from "@/stores/recently-generated-notes-store";
import { BarChart3, RefreshCw, Trash2 } from "lucide-react";

interface CacheStatsProps {
  className?: string;
}

const CacheStats: React.FC<CacheStatsProps> = ({ className = "" }) => {
  const { getCacheStats, resetCacheStats, clearGeneratedNotes } =
    useRecentlyGeneratedNotesStore();

  const [stats, setStats] = React.useState({
    hits: 0,
    misses: 0,
    hitRate: "0.00%",
  });

  // Update stats periodically
  React.useEffect(() => {
    const updateStats = () => {
      setStats(getCacheStats());
    };

    updateStats();
    const interval = setInterval(updateStats, 1000); // Update every second

    return () => clearInterval(interval);
  }, [getCacheStats]);

  const handleResetStats = () => {
    resetCacheStats();
    setStats({ hits: 0, misses: 0, hitRate: "0.00%" });
  };

  const handleClearCache = () => {
    clearGeneratedNotes();
    resetCacheStats();
    setStats({ hits: 0, misses: 0, hitRate: "0.00%" });
  };

  return (
    <Card className={`w-full max-w-md ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm font-medium">
              Cache Statistics
            </CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            Debug
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.hits}
            </div>
            <div className="text-xs text-muted-foreground">Cache Hits</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {stats.misses}
            </div>
            <div className="text-xs text-muted-foreground">Cache Misses</div>
          </div>
        </div>

        <div className="text-center">
          <div className="text-lg font-semibold text-primary">
            {stats.hitRate}
          </div>
          <div className="text-xs text-muted-foreground">Hit Rate</div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetStats}
            className="flex-1"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Reset Stats
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearCache}
            className="flex-1 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Clear Cache
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-center">
          Cache automatically expires after 24 hours
        </div>
      </CardContent>
    </Card>
  );
};

export default CacheStats;
