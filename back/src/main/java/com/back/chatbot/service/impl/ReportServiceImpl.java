package com.back.chatbot.service.impl;

import com.back.chatbot.commons.JasperReportManager;
import com.back.chatbot.controller.dto.ReportDTO;
import com.back.chatbot.persistance.entity.ProductEntity;
import com.back.chatbot.persistance.repository.IProductRepository;
import com.back.chatbot.service.IReportService;
import net.sf.jasperreports.engine.*;

import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import javax.sql.DataSource;
import java.io.*;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportServiceImpl implements IReportService {

    @Autowired
    private IProductRepository productRepository;
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

    @Override
    public String exportReport(String reportFormat) throws FileNotFoundException, JRException {

        String path = "C:\\Users\\Exe\\Desktop\\Reportes";
        List<ProductEntity> list = productRepository.findAll();

        File file = ResourceUtils.getFile("C:\\Users\\Exe\\IdeaProjects\\DevBot\\back\\src\\main\\resources\\reports\\reporte1.jrxml");

        JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());

        JRBeanCollectionDataSource dataSource1 = new JRBeanCollectionDataSource(list);

        Map<String, Object> parameters = new HashMap<>();
        parameters.put("Autor","Exe");

        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource1);

        JasperExportManager.exportReportToPdfFile(jasperPrint, path +"miReporte.pdf");

        return "Reporte Generado";
    }

}
