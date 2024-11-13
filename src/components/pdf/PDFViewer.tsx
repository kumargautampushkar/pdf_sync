'use client';
import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useRoomStore } from '@/store/roomStore';
import { socket } from '@/lib/socket';
export function PDFViewer() {
  const { pdfUrl, currentPage, roomId } = useRoomStore();
  const [totalPages, setTotalPages] = useState(0);
  const handlePageChange = (newPage: number) =>
  {
    if (newPage > 0 && newPage <= totalPages) {
      socket.emit('change_page', { roomId, page: newPage });
    }
  };
  const onLoadSuccess = ({ numPages }: { numPages: number }) => {
    setTotalPages(numPages);
  };
  return (
    <div className="flex flex-col items-center">
      {pdfUrl ? (
        <>
          <Document file={pdfUrl} onLoadSuccess={onLoadSuccess}>
            <Page pageNumber={currentPage} width={600} />
          </Document>
          <div className="flex justify-between w-full mt-4">
            <button 
              className="btn"
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            <button 
              className="btn"
              disabled={currentPage >= totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
          <p>
            Page {currentPage} of {totalPages}
          </p>
        </>
      ) : (
        <p>No PDF loaded.</p>
      )}
    </div>
  );
}