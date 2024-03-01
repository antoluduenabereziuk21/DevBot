package com.back.chatbot.service.impl;

import com.back.chatbot.commons.JasperReportManager;
import com.back.chatbot.controller.dto.ReportDTO;
import com.back.chatbot.service.IReportService;
import net.sf.jasperreports.engine.JRException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;

@Service
public class ReportServiceImpl implements IReportService {
    @Autowired
    private JasperReportManager reportManager;
    @Autowired
    private DataSource dataSource;

    @Override
    public ReportDTO getOrderReport(Map<String, Object> params)
            throws JRException, IOException, SQLException{
            String fileName = "ReportePedido";
            ReportDTO dto = new ReportDTO();

            dto.setFileName(fileName + ".pdf");

            ByteArrayOutputStream stream = reportManager.export(fileName, params, dataSource.getConnection());

            byte[] bs = stream.toByteArray();
            dto.setStream(new ByteArrayInputStream(bs));
            dto.setLength(bs.length);

            return dto;
        }

}
