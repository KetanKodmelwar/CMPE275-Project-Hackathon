package com.app.OpenHack.Controller.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.OpenHack.entity.Organization;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Long>{

}
