package com.back.chatbot.commons;

import lombok.RequiredArgsConstructor;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.engine.util.JRSaver;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimplePdfExporterConfiguration;
import net.sf.jasperreports.export.SimplePdfReportConfiguration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.io.*;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Map;
@Component
@RequiredArgsConstructor
public class JasperReportManager {

    private final DataSource dataSource;
    private static final String REPORT_FOLDER = "reports";

    private static final String JASPER = ".jasper";

    public ByteArrayOutputStream export(String fileName, Map<String, Object> params,
                                        Connection con) throws JRException, IOException, SQLException {

        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        //ClassPathResource resource = new ClassPathResource(REPORT_FOLDER + File.separator + fileName + JASPER);
        InputStream inputStream = new FileInputStream(new File("src/main/resources/reports/OrderReport.jrxml"));
        //InputStream employeeReportStream = getClass().getResourceAsStream("/OrderReport.jrxml");
        //InputStream employeeReportStream = getClass().getResourceAsStream("/OrderReport.jrxml");
        JasperReport jasperReport = JasperCompileManager.compileReport(inputStream);

        JRSaver.saveObject(jasperReport, "OrderReport.jasper");
//      simple linea para subir algun cambio y deployar
//        InputStream inputStream = resource.getInputStream();
//        JasperPrint jasperPrint = JasperFillManager.fillReport(inputStream, params, con);
        JasperPrint jasperPrint = null;
        try {
            jasperPrint = JasperFillManager.fillReport(jasperReport, params, dataSource.getConnection());
        } catch (JRException e) {
            throw new RuntimeException(e);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        JasperExportManager.exportReportToPdfStream(jasperPrint,stream);

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


