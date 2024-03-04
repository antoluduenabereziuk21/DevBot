package com.back.chatbot.service.impl;

import com.back.chatbot.commons.JasperReportManager;
import com.back.chatbot.controller.dto.ReportDTO;
import com.back.chatbot.controller.dto.request.ItemsOrderRequestDto;
import com.back.chatbot.controller.dto.request.OrderRequestDto;
import com.back.chatbot.controller.dto.response.OrderResponseReport;
import com.back.chatbot.persistance.entity.ProductEntity;
import com.back.chatbot.persistance.mapper.OrderMapper;
import com.back.chatbot.persistance.repository.IOrderRepository;
import com.back.chatbot.persistance.repository.IProductRepository;
import com.back.chatbot.service.IReportService;
import net.sf.jasperreports.engine.*;

import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import javax.sql.DataSource;
import java.io.*;
import java.sql.SQLException;
import java.util.*;

@Service
public class ReportServiceImpl implements IReportService {
    @Autowired
    private IProductRepository productRepository;
    @Autowired
    private IOrderRepository orderRepository;
    @Autowired
    private OrderMapper orderMapper;
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

    @Override
    public byte[] exportReport2(String idOrder) throws FileNotFoundException, JRException {
//        String path = "C:\\Users\\Exe\\Desktop\\Reportes\\";
        String path = "src/main/resources/reports/ReportePedido.jrxml";


        OrderRequestDto order = orderMapper.toOrderRequestDto(orderRepository.findById(idOrder).orElseThrow());

        List<OrderResponseReport> list = new ArrayList<>();

        for (ItemsOrderRequestDto it: order.getItemsProducts()) {
            OrderResponseReport orderReport = new OrderResponseReport();
            orderReport.setIdOrderWA(order.getIdOrderWA());
            orderReport.setTotal(order.getTotal());
            orderReport.setDescription(it.getDescription());
            orderReport.setQuantity(it.getQuantity());
            orderReport.setPrice(it.getPrice());
            list.add(orderReport);
        }

//        File file = ResourceUtils.getFile("C:\\Users\\Exe\\IdeaProjects\\DevBot\\back\\src\\main\\resources\\reports\\ReportePedido.jrxml");
        File file = ResourceUtils.getFile("src/main/resources/reports/ReportePedido.jrxml");


        JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());

        JRBeanCollectionDataSource dataSource1 = new JRBeanCollectionDataSource(list);

        HashMap<String, Object> parameters = new HashMap<>();

        parameters.put("Autor","Exe");

        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, null, dataSource1);

        //JasperExportManager.exportReportToPdfFile(jasperPrint, path +"miReporte.pdf");

        byte[] report = JasperExportManager.exportReportToPdf(jasperPrint);

        return report;
    }

}
