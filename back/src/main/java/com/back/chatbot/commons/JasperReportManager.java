package com.back.chatbot.commons;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimplePdfExporterConfiguration;
import net.sf.jasperreports.export.SimplePdfReportConfiguration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.util.Map;
@Component
public class JasperReportManager {

    private static final String REPORT_FOLDER = "reports";

    private static final String JASPER = ".jasper";

    public ByteArrayOutputStream export(String fileName, Map<String, Object> params,
                                        Connection con) throws JRException, IOException {

        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        ClassPathResource resource = new ClassPathResource(REPORT_FOLDER + File.separator + fileName + JASPER);
        System.out.println("Ruta del archivo1 .jasper: " + resource.getURL().getPath());
        InputStream inputStream = resource.getInputStream();
        JasperPrint jasperPrint = JasperFillManager.fillReport(inputStream, params, con);
        JasperExportManager.exportReportToPdfStream(jasperPrint, stream);
        JasperExportManager.exportReportToPdfFile(jasperPrint, "src/main/resources" + "/ReportePedido.pdf");
//        JRPdfExporter exporter = new JRPdfExporter();
//
//        exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
//        exporter.setExporterOutput(
//                new SimpleOutputStreamExporterOutput("ReportePedido.pdf"));
//
//        SimplePdfReportConfiguration reportConfig
//                = new SimplePdfReportConfiguration();
//        reportConfig.setSizePageToContent(true);
//        reportConfig.setForceLineBreakPolicy(false);
//
//        SimplePdfExporterConfiguration exportConfig
//                = new SimplePdfExporterConfiguration();
//        exportConfig.setMetadataAuthor("baeldung");
//        exportConfig.setEncrypted(true);
//        exportConfig.setAllowedPermissionsHint("PRINTING");
//
//        exporter.setConfiguration(reportConfig);
//        exporter.setConfiguration(exportConfig);
//
//        exporter.exportReport();


        return stream;
    }

}


