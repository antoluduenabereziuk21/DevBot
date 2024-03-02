package com.back.chatbot.controller;

import com.back.chatbot.controller.dto.ReportDTO;
import com.back.chatbot.service.IReportService;
import net.sf.jasperreports.engine.JRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;

@RestController
@RequestMapping
public class ReportController {
    @Autowired
    private IReportService iReportService;
    @GetMapping(path = "/report/download")
    public ResponseEntity<Resource> download(@RequestParam Map<String, Object> params)

            throws JRException, IOException, SQLException {
        ReportDTO dto = iReportService.getOrderReport(params);

        InputStreamResource streamResource = new InputStreamResource(dto.getStream());
        MediaType mediaType = MediaType.APPLICATION_PDF;

        return ResponseEntity.ok().header("Content-Disposition", "attachment; filename=\"" + dto.getFileName() + "\"")
                .contentLength(dto.getLength()).contentType(mediaType).body(streamResource);
    }
    @GetMapping("/report/{format}")
    public String generateReport(@PathVariable String format) throws JRException, FileNotFoundException {
        return iReportService.exportReport(format);
    }

    @GetMapping("/orderReport/{idOrder}")
    public String generateOrderReport(@PathVariable String idOrder) throws JRException, FileNotFoundException {
        return iReportService.exportReport2(idOrder);
    }
}
