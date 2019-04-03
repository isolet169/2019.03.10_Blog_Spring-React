package com.blog.link;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LinkController {
	@Autowired
	LinkDao ld;
	@Autowired
	LinkService ls;
	
	@PostMapping("taglinklist")
	public List<HashMap<String,Object>> tagLinkList(@RequestBody HashMap<String,String> map){
		return ld.tagLinkList(map.get("tag"));
	}
	@PostMapping("addLink")
	public boolean addLink(@RequestBody HashMap<String,String> map) {
		ls.addLink(map);	
		return true;
	}
	@GetMapping("alllinklist")
	public List<HashMap<String,Object>> allLinkList(){
		return ld.allLinkList();
	}
}
