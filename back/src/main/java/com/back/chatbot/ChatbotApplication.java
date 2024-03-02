package com.back.chatbot;

import net.sf.jasperreports.engine.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
public class ChatbotApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChatbotApplication.class, args);

	}

//	@Bean
//	CommandLineRunner init() {
//		return args -> {
//			String destinationPath = "src" + File.separator
//									+ "main" + File.separator
//									+ "resources" + File.separator
//									+ "reports" + File.separator
//									+ "ReportGenerated.pdf";
//
//			String filePath = "src" + File.separator
//							+ "main" + File.separator
//							+ "resources" + File.separator
//							+ "reports" + File.separator
//							+ "OrderReport.jrxml";
//
//			Map<String, Object> parameters = new HashMap<>();
//			parameters.put("")
//
//			JasperReport report = JasperCompileManager.compileReport(filePath);
//			JasperPrint print = JasperFillManager.fillReport(report, parameters, );
//			JasperExportManager.exportReportToPdfFile(print, destinationPath);
//		};
//	}
}
