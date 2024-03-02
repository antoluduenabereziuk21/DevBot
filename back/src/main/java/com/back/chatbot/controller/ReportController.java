package com.back.chatbot.controller;

import com.back.chatbot.controller.dto.ReportDTO;
import com.back.chatbot.service.IReportService;
import net.sf.jasperreports.engine.JRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    /*   order = orderService.getOrderBy(id)
        param= order.id
        set.
     */
            throws JRException, IOException, SQLException {
        //getOrderReport???? si no existe Entidad ni Ordenes guardadas
        //tenemos que traer una orden y eso pasarlo como param, ya que es objeto y se va mapear

        ReportDTO dto = iReportService.getOrderReport(params);

        InputStreamResource streamResource = new InputStreamResource(dto.getStream());
        MediaType mediaType = MediaType.APPLICATION_PDF;

        return ResponseEntity.ok().header("Content-Disposition", "attachment; filename=\"" + dto.getFileName() + "\"")
                .contentLength(dto.getLength()).contentType(mediaType).body(streamResource);
    }

}
