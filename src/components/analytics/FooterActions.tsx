import { Download, Save, CalendarClock, FileSpreadsheet, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export function FooterActions() {
  const handleSaveView = () => {
    toast.success("تم حفظ العرض بنجاح", {
      description: "يمكنك الوصول إليه من قائمة العروض المحفوظة",
    });
  };

  const handleExport = (format: string) => {
    toast.success(`جاري تصدير التقرير بصيغة ${format}`, {
      description: "سيتم تحميل الملف تلقائيًا",
    });
  };

  const handleSchedule = () => {
    toast.success("تم جدولة التقرير", {
      description: "سيتم إرسال التقرير أسبوعيًا على بريدك الإلكتروني",
    });
  };

  return (
    <footer className="sticky bottom-0 z-40 bg-card border-t border-border">
      <div className="container max-w-[1280px] mx-auto px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            آخر تحديث: منذ 5 دقائق
          </p>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleSaveView}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              حفظ العرض
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  تصدير
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => handleExport("CSV")}>
                  <FileSpreadsheet className="w-4 h-4 ml-2" />
                  CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("XLSX")}>
                  <FileSpreadsheet className="w-4 h-4 ml-2" />
                  Excel (XLSX)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("PDF")}>
                  <FileText className="w-4 h-4 ml-2" />
                  PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button onClick={handleSchedule} className="gap-2">
              <CalendarClock className="w-4 h-4" />
              جدولة التقرير
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
