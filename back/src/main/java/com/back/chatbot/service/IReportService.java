package com.back.chatbot.service;

import com.back.chatbot.controller.dto.ReportDTO;
import net.sf.jasperreports.engine.JRException;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;

public interface IReportService {
    ReportDTO getOrderReport(Map<String, Object> params)
            throws JRException, IOException, SQLException;
}
