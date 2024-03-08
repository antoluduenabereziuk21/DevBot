package com.back.chatbot.service.impl;

import com.back.chatbot.controller.dto.response.OrderResponseReportDTO;
import com.back.chatbot.persistance.entity.ClientEntity;
import com.back.chatbot.persistance.entity.ItemsOrderEntity;
import com.back.chatbot.persistance.entity.OrderEntity;
import com.back.chatbot.persistance.mapper.OrderMapper;
import com.back.chatbot.persistance.repository.IClientRepository;
import com.back.chatbot.persistance.repository.IOrderRepository;
import com.back.chatbot.persistance.repository.IProductRepository;
import com.back.chatbot.service.IReportService;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import javax.sql.DataSource;
import java.io.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class ReportServiceImpl implements IReportService {
    @Autowired
    private IClientRepository clientRepository;
    @Autowired
    private IProductRepository productRepository;
    @Autowired
    private IOrderRepository orderRepository;
    @Autowired
    private OrderMapper orderMapper;
    @Autowired
    private DataSource dataSource;
    @Value("${file.upload.dir}")
    private String DIRECTORIO_UPLOAD;

    @Override
    public byte[] exportReport(String idOrder, String cellPhone) throws FileNotFoundException, JRException {

        OrderEntity order = orderRepository.findById(idOrder).orElseThrow(
                () -> new RuntimeException("Order not found")
        );

        ClientEntity client = clientRepository.findClientByCellPhone(cellPhone);

        List<OrderResponseReportDTO> list = new ArrayList<>();

        for (ItemsOrderEntity it : order.getItemsProducts()) {

            OrderResponseReportDTO orderReport = new OrderResponseReportDTO();
            orderReport.setIdOrderWA(order.getIdOrderWA());
            orderReport.setTotal(order.getTotal());
            orderReport.setName(it.getName());
            orderReport.setQuantity(it.getQuantity());
            orderReport.setPrice(it.getPrice());
            orderReport.setNameClient(client.getName() + " " + client.getLast_name());
            orderReport.setAddress(client.getAddress());
            orderReport.setCellPhone(cellPhone);

            list.add(orderReport);
        }

        Path path = this.getPath("Voucher.jrxml");

        File file = ResourceUtils.getFile(path.toAbsolutePath().toString());

        JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());

        JRBeanCollectionDataSource dataSource1 = new JRBeanCollectionDataSource(list);

        HashMap<String, Object> parameters = new HashMap<>();

        parameters.put("Report", "Report");

        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, null, dataSource1);

        //JasperExportManager.exportReportToPdfFile(jasperPrint, path +"miReporte.pdf");

        byte[] report = JasperExportManager.exportReportToPdf(jasperPrint);

        return report;
    }

    private Path getPath(String nombreArchivo) {
        return Paths.get(DIRECTORIO_UPLOAD).resolve(nombreArchivo).toAbsolutePath();
    }

}
