export interface PdfCheatSheet {
  id: number;
  link: string;
  subject: string;
  unit: number;
  title: string;
  thumbnails?: {
    page1: string;
    page2: string;
  };
}

export const pdfCheatSheets: PdfCheatSheet[] = [
  {
    id: 1,
    link: "https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/pdfs/Macro_Graph_Connections.pdf",
    subject: "AP Macro",
    unit: 1,
    title: "CHEAT SHEET: AD-AS MODEL"
  },
  {
    id: 2,
    link: "https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/pdfs/Macro_Its_All_Connected.pdf",
    subject: "AP Macro",
    unit: 1,
    title: "It's ALL CONNECTED!"
  },
  {
    id: 3,
    link: "https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/pdfs/The_Big_Picture.pdf",
    subject: "AP Macro",
    unit: 1,
    title: "The Big Picture: Every AP Macro Graph"
  },
  {
    id: 4,
    link: "https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/pdfs/Unit_1_Macro.pdf",
    subject: "AP Macro",
    unit: 1,
    title: "Unit 1: Downloadable Cheat Sheet",
    thumbnails: {
      page1: "/images/pdfThumbnails/4/1.png",
      page2: "/images/pdfThumbnails/4/2.png"
    }
  }
];
