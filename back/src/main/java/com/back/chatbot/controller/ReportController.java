package com.back.chatbot.controller;

import com.back.chatbot.service.IReportService;
import net.sf.jasperreports.engine.JRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;

@RestController
@RequestMapping
public class ReportController {
    @Autowired
    private IReportService iReportService;

    //commet for deploy
    @GetMapping("/orderReport")
    public ResponseEntity<Resource> generateOrderReport(@RequestParam String idOrder,
                                                        @RequestParam String cellPhone,
                                                        @RequestParam Boolean delivery)
                                                                throws JRException, FileNotFoundException {

        byte[] byteReport = iReportService.exportReport(idOrder, cellPhone, delivery);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + idOrder.concat(".pdf") + "\"")
                .body(new ByteArrayResource(byteReport));
    }

}
