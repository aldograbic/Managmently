package com.project.Managmently.controllers.authRestricted;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.project.Managmently.classes.Property;
import com.project.Managmently.classes.Tenant;
import com.project.Managmently.classes.User;
import com.project.Managmently.repositories.properties.PropertyRepository;
import com.project.Managmently.repositories.tenants.TenantRepository;
import com.project.Managmently.repositories.user.UserRepository;

@Controller
public class TenantsController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TenantRepository tenantRepository;

    @Autowired
    private PropertyRepository propertyRepository;
    
    @GetMapping("/tenants")
    public String getTenantsPage(Model model) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        model.addAttribute("user", user);

        List<Property> properties = propertyRepository.getPropertiesForUserById(user.getId());
        model.addAttribute("properties", properties);

        return "authRestricted/tenants";
    }

    @PostMapping("/insertTenant")
    public String insertTenant(@ModelAttribute Tenant tenant,
                            @RequestParam("property") String propertyName,
                            RedirectAttributes redirectAttributes) {

        int propertyId = propertyRepository.getPropertyIdByName(propertyName);
        tenant.setPropertyId(propertyId);

        try {
            tenantRepository.insertTenant(tenant);
            redirectAttributes.addFlashAttribute("successMessage", "Tenant successfully added.");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", "There was an issue with adding the tenant. Try again.");
        }

        return "redirect:/tenants";
    }
}
