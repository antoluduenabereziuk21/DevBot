package com.back.chatbot.service;

import net.sf.jasperreports.engine.JRException;

import java.io.FileNotFoundException;

public interface IReportService {

    byte[] exportReport(String idOrder, String cellPhone) throws FileNotFoundException, JRException;
}
